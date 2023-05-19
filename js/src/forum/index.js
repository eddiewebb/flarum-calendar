import CalendarPage from './components/CalendarPage.js';
import EventPage from './components/EventPage.js';

import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import Event from './models/Event.js';
import Model from 'flarum/common/Model';
import app from 'flarum/forum/app.js';

app.initializers.add('webbinaro-calendar', () => {
  app.routes.advevents = { path: '/events', component: CalendarPage };
  app.routes.advevent = { path: '/events/:id', component: EventPage };

  // Allows easy route generation by passing an event from components (see EventFragment)
  app.route.advevent = (event) => app.route('advevent', { id: event.id() });

  app.store.models.events = Event;
  app.store.models.users.prototype.canModerateEvents = Model.attribute('canModerateEvents');
  app.store.models.users.prototype.canStartEvents = Model.attribute('canStartEvents');
  app.store.models.users.prototype.canViewEvents = Model.attribute('canViewEvents');

  // Add events to side nav
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'events',
      <LinkButton icon="fas fa-calendar-alt" href={app.route('advevents')}>
        {app.translator.trans('flarum-calendar.forum.button.landing')}
      </LinkButton>,
      50
    );
    return items;
  });
});

export * from './components';
export * from './models';
export * from './states';
export * from './utils';
