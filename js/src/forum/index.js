
import { Extend } from '@flarum/core/forum';
import CalendarComponent  from './Components/Calendar.js';





app.initializers.add('webbinaro/adv-extras', () => {
	app.routes.advcalendar = {path: '/users', component: <CalendarComponent />};
  	console.log('[webbinaro/adv-extras] Hello, admin!');

});