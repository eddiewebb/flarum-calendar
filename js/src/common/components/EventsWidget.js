/*
 * This file is part of justoverclock/last-tweet.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/forum/app';


export default class EventsWidget extends Widget {


  oncreate(vnode) {
    const todayDate = new Date().toISOString().slice(0, 10);
    console.log(todayDate);
    const apiUrl = app.forum.attribute('baseUrl') + '/api/events?start=allDay';
    console.log(apiUrl)
    fetch(apiUrl)
      .then(res => res.json())
      .then(out =>
        console.log('Checkout this JSON! ', out))
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
    return (
      <div className="eventss-widget-content">
        <div className="EventPage">
          <div id="myData">

          </div>
        </div>
      </div>
    );
  }
}
