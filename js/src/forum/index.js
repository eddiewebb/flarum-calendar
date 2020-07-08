
import { Extend } from '@flarum/core/forum';
import CalendarComponent  from './Components/Calendar.js';

import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';


app.initializers.add('webbinaro/flarum-calendar', () => {
	app.routes.advevents = {path: '/events', component: <CalendarComponent />};


	console.log('[webbinaro/flarum-calendar] Hello, forum user!');

	//add google to header
  extend(HeaderPrimary.prototype, 'items', function(items) {
    items.add('google', <a href="https://google.com">Google</a>);
  });

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


