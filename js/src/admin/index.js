import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('webbinaro/adv-extras', () => {
  console.log('[webbinaro/adv-extras] Hello, admin!');
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

});
