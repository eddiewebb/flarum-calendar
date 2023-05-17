import CalendarPage from './components/CalendarPage.js';
import EventPage from './components/EventPage.js';

import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import Event from './models/Event.js';
import Model from 'flarum/common/Model';
import app from 'flarum/forum/app.js';

//app.initializers.add('webbinaro/flarum-calendar', () => {
app.initializers.add('webbinaro-calendar', () => {
  app.routes.advevents = { path: '/events', component: CalendarPage };
  app.routes.advevent = { path: '/events/:id', component: EventPage };

  //allows easy route generation by passing an event from components (see EventFragment)
  app.route.advevent = (event) => app.route('advevent', { id: event.id() });

  app.store.models.events = Event;
  app.store.models.users.prototype.canModerateEvents = Model.attribute('canModerateEvents');
  app.store.models.users.prototype.canStartEvents = Model.attribute('canStartEvents');
  app.store.models.users.prototype.canViewEvents = Model.attribute('canViewEvents');

  //add events to side nav
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'events',
      LinkButton.component(
        {
          icon: 'fas fa-calendar-alt',
          href: app.route('advevents'),
        },
        app.translator.trans('flarum-calendar.forum.button.landing')
      ),
      50
    );
    return items;
  });
}); //end initalizer
