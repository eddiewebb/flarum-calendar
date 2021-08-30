import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';

import EventsWidget from './components/EventsWidget';

export default function (app) {
  (new Widgets)
    .add({
      key: 'CalEvents',
      component: EventsWidget,
      isDisabled: false,
      isUnique: true,
      placement: 'end',
      position: 1,
    })
    .extend(app, 'webbinaro-calendar');
};
