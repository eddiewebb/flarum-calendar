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
import CalendarPage from "../../forum/Components/CalendarPage";

export default class EventsWidget extends Widget {


  oncreate(vnode) {

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

        </div>
      </div>
    );
  }
}
