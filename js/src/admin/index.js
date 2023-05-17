import { extend } from 'flarum/common/extend';
import BasicsPage from 'flarum/admin/components/BasicsPage';

app.initializers.add('webbinaro/flarum-calendar', () => {
  // console.log('[webbinaro/flarum-calendar] Hello, admin!');

  app.extensionData
    .for('webbinaro-calendar')
    /*.registerSetting(
      {
        setting: 'some-key', // This is the key the settings will be saved under in the settings table in the database.
        label: app.translator.trans('flarum-calendar.admin.title'), // The label to be shown letting the admin know what the setting does.
        type: 'boolean', // What type of setting this is, valid options are: boolean, text (or any other <input> tag type), and select. 
      },
      30 // Optional: Priority
    )*/
    .registerSetting(
      {
        setting: 'webbinaro-calendar.hide_host',
        label: app.translator.trans('flarum-calendar.admin.settings.hide_host'),
        type: 'boolean',
      }
    )
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
