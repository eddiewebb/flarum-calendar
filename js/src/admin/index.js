import { extend } from 'flarum/common/extend';
import BasicsPage from 'flarum/admin/components/BasicsPage';
import app from 'flarum/admin/app';

app.initializers.add('webbinaro-calendar', () => {
  app.extensionData
    .for('webbinaro-calendar')
    .registerSetting({
      setting: 'webbinaro-calendar.hide_host',
      label: app.translator.trans('flarum-calendar.admin.settings.hide_host'),
      type: 'boolean',
    })
    .registerPermission(
      {
        icon: 'fas fa-calendar', // Font-Awesome Icon
        label: app.translator.trans('flarum-calendar.admin.permissions.view'), // Permission Label
        permission: 'event.view', // Actual permission name stored in database (and used when checking permission).
        allowGuest: true,
      },
      'view', // Category permission will be added to on the grid
      95 // Optional: Priority
    )
    .registerPermission(
      {
        icon: 'fas fa-calendar-plus', // Font-Awesome Icon
        label: app.translator.trans('flarum-calendar.admin.permissions.add'), // Permission Label
        permission: 'event.create', // Actual permission name stored in database (and used when checking permission).
      },
      'start', // Category permission will be added to on the grid
      95 // Optional: Priority
    )
    .registerPermission(
      {
        icon: 'fas fa-calendar-times', // Font-Awesome Icon
        label: app.translator.trans('flarum-calendar.admin.permissions.moderate'), // Permission Label
        permission: 'event.moderate', // Actual permission name stored in database (and used when checking permission).
      },
      'moderate', // Category permission will be added to on the grid
      95 // Optional: Priority
    );

  extend(BasicsPage.prototype, 'homePageItems', (items) => {
    items.add('events', {
      path: '/events',
      label: app.translator.trans('flarum-calendar.admin.basics.homepage'),
    });
  });
});
