
import CalendarPage  from './Components/CalendarPage.js';
import EventPage from "./Components/EventPage";

import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';
import Event from "./Models/Event";
import Model from "flarum/Model";


app.initializers.add('webbinaro/flarum-calendar', () => {
  app.routes.advevents = {path: '/events', component: <CalendarPage />};
  app.routes.advevent = {path: '/events/:id', component: <EventPage  /> };

  //allows easy route generation by passing an event from components (see EventFragment)
  app.route.advevent = event => app.route('advevent', {id: event.id()});

	//add events to side nav
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'events',
      LinkButton.component({
        icon: 'fas fa-calendar-alt',
        children: 'Event Calendar',
        href: app.route('advevents'),
      }),
      -9.5
    );
    return items;
  });

  app.store.models.events = Event;

  //alert(app.translator.trans('flarum-calendar.forum.modal.submit'));

  app.store.models.users.prototype.canModerateEvents = Model.attribute('canModerateEvents');
  app.store.models.users.prototype.canStartEvents = Model.attribute('canStartEvents');
}); //end initalizer


