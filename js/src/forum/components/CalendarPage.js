import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import IndexPage from 'flarum/forum/components/IndexPage';
import dynamicallyLoadLib from '../utils/dynamicallyLoadLib';
import EventTeaser from './EventTeaser';
import Button from 'flarum/common/components/Button';
import EditEventModal from './EditEventModal';
import LogInModal from 'flarum/forum/components/LogInModal';
import CalendarState from '../states/CalendarState';

export default class CalendarPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    app.history.push('advevents');
    this.bodyClass = 'App--calendar';
    app.setTitle(app.translator.trans('flarum-calendar.forum.button.landing'));
  }

  view() {
    return (
      <div className="IndexPage CalendarPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(this.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              <div className="IndexPage-toolbar"></div>
              <div id="calendar" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Build an item list for the sidebar of the index page. By default this is a
   * "New Discussion" button, and then a DropdownSelect component containing a
   * list of navigation items.
   *
   * @return {ItemList}
   */
  sidebarItems() {
    const items = IndexPage.prototype.sidebarItems();
    if (app.session.user) {
      if (app.session.user.canStartEvents()) {
        items.setContent(
          'newDiscussion',
          <Button
            icon="fas fa-calendar-plus"
            className="Button Button--primary PollModal-SubmitButton"
            itemClassName="App-primaryControl"
            onclick={this.openCreateModal.bind(this)}
          >
            {app.translator.trans('flarum-calendar.forum.button.create')}
          </Button>
        );
      } else {
        items.remove('newDiscussion');
      }
    } else {
      items.setContent(
        'newDiscussion',
        <Button
          icon="fas fa-calendar-plus"
          className="Button Button--primary PollModal-SubmitButton"
          itemClassName="App-primaryControl"
          onclick={this.openCreateModal.bind(this)}
        >
          {app.translator.trans('flarum-calendar.forum.button.login')}
        </Button>
      );
    }
    return items;
  }

  oncreate(vnode) {
    this.renderCalendar(vnode);
  }

  onupdate(vnode) {
    this.state.refresh(false);
  }

  async renderCalendar(vnode) {
    await dynamicallyLoadLib('fullcalendarCore');
    await dynamicallyLoadLib(['fullcalendarLocales', 'fullcalendarDayGrid', 'fullcalendarInteraction', 'fullcalendarList']);

    const calendarEl = document.getElementById('calendar');
    const openModal = this.openCreateModal.bind(this);

    // console.debug(`Loading Full Calendar with locale: ${app.translator.getLocale()}`);
    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: app.translator.getLocale(), // the initial locale
      headerToolbar: { center: 'dayGridMonth,listYearFromToday' }, // buttons for switching between views
      initialView: 'dayGridMonth',
      views: {
        listYearFromToday: {
          type: 'list',
          visibleRange: function (currentDate) {
            // Generate a new date for manipulating in the next step
            var startDate = new Date(currentDate.valueOf());
            var endDate = new Date(currentDate.valueOf());

            // Adjust the end date to one year into the future
            endDate.setFullYear(endDate.getFullYear() + 1);

            return { start: startDate, end: endDate };
          },
          listDaySideFormat: { weekday: 'long' }, // day-of-week is nice-to-have
        },
      },
      eventClick: async function (info) {
        info.jsEvent.preventDefault();
        for (let event of (await this.state?.getEvents()) || []) {
          if (event.id() === info.event.extendedProps.eventId) {
            app.modal.show(EventTeaser, { event: event });
            break;
          }
        }
      }.bind(this),
      dateClick: function (info) {
        openModal(info);
      },
      events: (info, successCb, failureCb) => this.state?.getEvents(info, successCb, failureCb) || [],
      eventDataTransform: this.flarumToFullCalendarEvent,
    });
    calendar.render();

    this.state = new CalendarState(calendar, this);
    app.calendarState = this.state;
    this.state.refresh();
  }

  openCreateModal(info) {
    if (!app.session.user.canStartEvents()) {
      return;
    }

    const refresh = this.state.refresh.bind(this.state);

    if (app.session.user != undefined) {
      if (info.dateStr) {
        app.modal.show(EditEventModal, { withStart: info.dateStr, refresh });
      } else {
        app.modal.show(EditEventModal, { refresh });
      }
    } else {
      app.modal.show(LogInModal);
    }
  }

  flarumToFullCalendarEvent(eventData) {
    return {
      title: eventData.name(),
      end: eventData.event_end(),
      start: eventData.event_start(),
      extendedProps: {
        description: eventData.description(),
        user: eventData.user(),
        eventId: eventData.id(),
      },
      // for link awareness each event includes link evem though we use event  modal
      url: app.route('advevent', { id: eventData.id() }),
    };
  }
}
