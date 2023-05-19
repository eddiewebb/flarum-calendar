import app from 'flarum/app';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import SelectDropdown from 'flarum/components/SelectDropdown';
import { Calendar } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import EventTeaser from "./EventTeaser";
import Button from 'flarum/components/Button'
import EditEventModal from "./EditEventModal";
import LogInModal from 'flarum/components/LogInModal'
import Stream from 'flarum/utils/Stream';

const calendar = Stream();
const events = Stream();

export default class CalendarPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    return [
      <div className="IndexPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(this.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              <div className="IndexPage-toolbar">
              </div>
              <div id="calendar" />
            </div>
          </div>
        </div>
      </div>
    ];
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
    // newDiscussion = newEvent
    if(app.session.user){
      if(app.session.user.canStartEvents) {
        items.replace('newDiscussion',
          Button.component({
            icon: 'fas fa-calendar-plus',
            className: 'Button Button--primary PollModal-SubmitButton',
            itemClassName: 'App-primaryControl',
            onclick: this.openCreateModal.bind(this)
          }, app.translator.trans('flarum-calendar.forum.button.create'))
        );
      }else{
        items.remove('newDiscussion');
      }
    }else{
      items.replace('newDiscussion',
        Button.component({
          icon: 'fas fa-calendar-plus',
          className: 'Button Button--primary PollModal-SubmitButton',
          itemClassName: 'App-primaryControl',
          onclick: this.openCreateModal.bind(this)
        }, app.translator.trans('flarum-calendar.forum.button.login'))
      );
    }
    return items;
  }

  oncreate(vnode){
    this.renderCalendar(vnode);
  }

  onupdate(vnode){
    this.renderCalendar(vnode);
  }

  renderCalendar(vnode){
    const calendarEl = document.getElementById('calendar');
    const openModal = this.openCreateModal.bind(this);

    console.debug(`Loading Full Calendar with locale: ${app.translator.getLocale()}`);
    const calendar = new Calendar(calendarEl, {
      locales: allLocales,
      locale: app.translator.getLocale(), // the initial locale
      headerToolbar: {center: 'dayGridMonth,listYear'}, // buttons for switching between views
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      eventClick: function (info) {
        info.jsEvent.preventDefault();
        for(var event of this.events){
          if(event.id() === info.event.extendedProps.eventId ){
            app.modal.show( EventTeaser, {"event": event} );
            break;
          }
        }
      }.bind(this),
      dateClick:  function(info){
        openModal(info);
      },
      events: function(info, successCallback, failureCallbacks){
        app.store.find('events', {start: info.start.toISOString(), end: info.end.toISOString(), sort: 'event_start'}).then(results => {
          this.events = results;
          successCallback( results);
          }
        )
      }.bind(this) ,
      eventDataTransform: this.flarumToFullCalendarEvent,
    });
    calendar.render();
  }

  openCreateModal(info) {
    if(app.session.user != undefined){
      if(info.dateStr){
        app.modal.show( EditEventModal, {withStart: info.dateStr});
      }else{
        app.modal.show( EditEventModal );
      }
    }else{
      app.modal.show( LogInModal );
    }
  }

  flarumToFullCalendarEvent(eventData){
    return {
        "title": eventData.name(),
        "end": eventData.event_end(),
        "start": eventData.event_start(),
        "extendedProps": {
          "description": eventData.description(),
          "user":eventData.user() ,
          "eventId": eventData.id(),
        },
        // for link awareness each event includes link evem though we use event  modal
        "url": app.route('advevent', {id: eventData.id()}),
      };
  }
}
