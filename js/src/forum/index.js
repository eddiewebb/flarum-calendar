
import CalendarComponent  from './Components/Calendar.js';

import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';


app.initializers.add('webbinaro/flarum-calendar', () => {
	app.routes.advevents = {path: '/events', component: <CalendarComponent />};
  //add events to side nav
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'events',
      LinkButton.component({
        icon: 'fas fa-th-list',
        children: 'Event Calendar',
        href: app.route('advevents'),
      }),
      -9.5
    );
    return items;
  });



}); //end initalizer


