import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

import BasicsPage from 'flarum/components/BasicsPage';


app.initializers.add('webbinaro/flarum-calendar', () => {
  console.log('[webbinaro/flarum-calendar] Hello, admin!');
  extend(PermissionGrid.prototype, 'moderateItems', items => {
    items.add(
      'webbinaro-calendar',
      {
        icon: 'fa fa-calendar-times',
        label: app.translator.trans('flarum-calendar.admin.permissions.moderate'),
        permission: 'event.moderate',
      },
      95
    );
  });

  extend(PermissionGrid.prototype, 'startItems', items => {
    items.add(
      'webbinaro-calendar-add',
      {
        icon: 'fa fa-calendar-plus',
        label: app.translator.trans('flarum-calendar.admin.permissions.add'),
        permission: 'event.create',
      },
      95
    );
  });

  extend(PermissionGrid.prototype, 'viewItems', items => {
    items.add(
      'webbinaro-calendar-view',
      {
        icon: 'fa fa-calendar',
        label: app.translator.trans('flarum-calendar.admin.permissions.view'),
        permission: 'event.view',
        allowGuest: true,
      },
      95
    );
  });

  app.extensionSettings['flarum-calendar'] = () =>
    app.modal.show(
      new SettingsModal({
        title: app.translator.trans('flarum-calendar.admin.title'),
        type: 'small',
        items: [
          <legend class="categories-legend">{app.translator.trans('flarum-calendar.admin.welcome.widget')}</legend>,
          <BooleanItem key="flarum-calendar.admin.welcome.widget" required>
            <span class="categories-label">{app.translator.trans('flarum-calendar.admin.welcome.widget')}</span>
          </BooleanItem>,
        ],
      })
    );
  extend(BasicsPage.prototype, 'homePageItems', (items) => {
    items.add('events', {
      path: '/events',
      label: app.translator.trans('flarum-calendar.admin.basics.homepage'),
    });
  });

});


