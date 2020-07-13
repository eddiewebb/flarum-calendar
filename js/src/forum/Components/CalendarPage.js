import app from 'flarum/app';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import SelectDropdown from 'flarum/components/SelectDropdown';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import EventDetailsModal from "./EventDetailsModal";
import Button from 'flarum/components/Button'
import EditEventModal from "./EditEventModal";
import LogInModal from 'flarum/components/LogInModal'


export default class CalendarPage extends Page {
  init() {
    super.init();
    this.calendar = m.prop();
    this.events = m.prop();
  }

  onunload() {
  }

  view() {
    return (
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
    //new evemt
    items.replace('newDiscussion',
      Button.component({
        children: app.translator.trans('flarum-calendar.forum.button.create'),
        icon: 'fas fa-calendar-plus',
        className: 'Button Button--primary PollModal-SubmitButton',
        itemClassName: 'App-primaryControl',
        onclick: this.openCreateModal.bind(this)
      })
    );


    items.replace('nav',
      SelectDropdown.component({
        children: this.navItems(this).toArray(),
        buttonClassName: 'Button',
        className: 'App-titleControl'
      })
    );

    return items;
  }

  /**
   * Build an item list for the navigation in the sidebar of the index page. By
   * default this is just the 'All Discussions' link.
   *
   * @return {ItemList}
   */
  navItems() {
    const items = IndexPage.prototype.navItems();

    /* items.add('fof-user-directory',
         LinkButton.component({
             href: app.route('advevents'),
             children: "View a new events",
             icon: 'far fa-address-book'
         }),
         85
     );*/

    return items;
  }

  /**
   * Config runs after the elemtns are rendered on page, perfect to run any script against the repainted DOM.
   * @param isInitialized
   * @param context
   */
  config(isInitialized, context) {

    if(isInitialized){
      return;
    }
    console.log("[webbinaro/flarum-calendar] loading events..");
    app.store.find('events', {sort: 'createdAt'}).then(results => {
        this.events(results);
        this.renderCalendarEvents(results)
    }
    );
  }


  renderCalendarEvents(data){
    console.log("rendering events")
    //Flarum payload includes an array + payload object [0, 1, 2, payload] - probably a better way to filter..
    let cleanedEvents = [];
    for (const eventKey in data) {
      if(data[eventKey].hasOwnProperty('createdAt')){
        cleanedEvents.push(data[eventKey]);
      }
    }
    const calendarEl = document.getElementById('calendar');
    const openModal = this.openCreateModal.bind(this);
    const calendar = new Calendar(calendarEl, {
      headerToolbar: {center: 'dayGridMonth,listYear'}, // buttons for switching between views
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      eventClick: function (info) {
        app.modal.show(
          new EventDetailsModal({"event": info.event, "calendar":this,"events":data})
        );
      },
      dateClick:  function(info){
        openModal(info);
      },
      events: cleanedEvents,
      eventDataTransform: this.flarumToFullCalendarEvent,
    });
    calendar.render();
    this.calendar(calendar);
  }

  openCreateModal(info) {
    if(app.session.user != undefined){
      let modal = new EditEventModal({"calendar":this.calendar(),"events":this.events()});
      if(info.date){
        modal = modal.withStart(info.date);
      }
      app.modal.show( modal );
    }else{
      app.modal.show(new LogInModal());
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
      };
  }
}


