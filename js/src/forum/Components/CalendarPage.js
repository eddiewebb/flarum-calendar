import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Component  from 'flarum/Component';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import SelectDropdown from 'flarum/components/SelectDropdown';
import LinkButton from 'flarum/components/LinkButton';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import EventDetailsModal from "./EventDetailsModal";
import User from 'flarum/User';
import Button from 'flarum/components/Button'
import EditEventModal from "./EditEventModal";

export default class CalendarPage extends Page {
  init() {
    super.init();
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
        children: "Add New Event",
        buttonClassName: 'Button',
        className: 'App-titleControl',
        onclick: this.openCreateModal
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

    console.log("[webbinaro/flarum-calendar] loading events..");
    app.store.find('events', {sort: 'createdAt'}).then(
      this.renderCalendarEvents
    );
  }


  renderCalendarEvents(data){

    //Flarum payload includes an array + payload object [0, 1, 2, payload] - probably a better way to filter..
    let cleanedEvents = [];
    for (const eventKey in data) {
      if(data[eventKey].hasOwnProperty('createdAt')){
        cleanedEvents.push(data[eventKey]);
      }
    }
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      headerToolbar: {center: 'dayGridMonth,listYear'}, // buttons for switching between views
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      eventClick: function (info) {
        app.modal.show(
          new EventDetailsModal({"event": info.event})
        );

        // change the border color just for fun
        info.el.style.borderColor = 'red';
      },
      events: cleanedEvents,
      eventDataTransform: function (eventData) {
        return {
          "id": eventData.id,
          "title": eventData.name(),
          "end": eventData.event_end(),
          "start": eventData.event_start(),
          "extendedProps": {
            "description": eventData.description(),
            "user":eventData.user() ,
          },
        };
      }
    });
    calendar.render();

  }

  openCreateModal() {
    app.modal.show(
      new EditEventModal()
    );

  }
}


