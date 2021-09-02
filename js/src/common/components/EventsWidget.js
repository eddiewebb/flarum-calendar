/*
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/forum/app';
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import Separator from "flarum/common/components/Separator";

export default class EventsWidget extends Widget {

  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
  }

  oncreate(vnode) {
    const todayDate = new Date().toISOString().slice(0, 10);
    // for the end parameter i'm using today date + 1
    let NextDayEvents = new Date();
    NextDayEvents.setDate(NextDayEvents.getDate() + 1);
    NextDayEvents = NextDayEvents.toISOString().slice(0, 10);
    // get events object
    app.store.find('events', {
      // seems that not accept the end parameter as the same day of start
      allDay: true,
      start: todayDate,
      end: NextDayEvents,
    }).then(results => {
      this.events = results;
      // console.log(results) <-------------------------------- debug line
      this.loading = false;
      m.redraw();
    });
  }

  className() {
    return 'events-widget';
  }

  icon() {
    // Widget icon.
    return 'far fa-calendar';
  }

  title() {
    // Widget title.
    return app.translator.trans('flarum-calendar.forum.widget-title');
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator/>;
    }
    return (
      <div className="events-widget-content">
        <ul className="CustomEventsList fa-ul">
          {this.events.map((event) => (
            <li><i className="far fa-calendar-alt"></i>
              {event.event_start().toISOString().slice(0, 10)}
              <br></br>
              <i className="far fa-check-square"></i>
              {event.description()}
              {Separator.component()}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
