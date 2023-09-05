import Component from 'flarum/common/Component';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import username from 'flarum/common/helpers/username';
import userOnline from 'flarum/common/helpers/userOnline';
import EditEventModal from './EditEventModal';
import fullTime from 'flarum/common/helpers/fullTime';
import app from 'flarum/forum/app';

export default class EventFragment extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  title() {
    return this.attrs.event.name();
  }

  className() {
    return 'EventTeaser Modal--small';
  }

  view() {
    return (
      <div>
        <p id="eventdescription" />
        {!app.forum.attribute('webbinaro-calendar.hide_host') && (
          <p>
            {app.translator.trans('flarum-calendar.forum.event.hosted_by')}{' '}
            <Link href={app.route.user(this.attrs.event.user())}>
              {userOnline(this.attrs.event.user())}
              {username(this.attrs.event.user())}
            </Link>
          </p>
        )}
        <p>
          {app.translator.trans('flarum-calendar.forum.event.starts')} {fullTime(this.attrs.event.event_start())} <br />
          {app.translator.trans('flarum-calendar.forum.event.ends')} {fullTime(this.attrs.event.event_end())}
        </p>
        {app.session.user && (app.session.user.canModerateEvents() || this.attrs.event.user().id() === app.session.user.id()) && (
          <div>
            <Button icon="fas fa-edit" onclick={this.editLaunch.bind(this)} className="Button Button--icon Button--link" />
            <Button icon="fas fa-trash-alt" onclick={this.deleteEvent.bind(this)} className="Button Button--icon Button--link" />
          </div>
        )}
      </div>
    );
  }

  oncreate(vnode) {
    const descElement = document.getElementById('eventdescription');
    s9e.TextFormatter.preview(this.attrs.event.description(), descElement);
  }

  editLaunch() {
    app.modal.show(EditEventModal, { event: this.attrs.event, refresh: app.calendarState.refresh.bind(app.calendarState) });
  }

  deleteEvent() {
    if (!confirm(app.translator.trans('flarum-calendar.forum.event.confirm_delete'))) {
      return;
    }
    this.attrs.event.delete().then(() => {
      app.alerts.show(Alert, { type: 'success' }, app.translator.trans('flarum-calendar.forum.event.deleted'));
      m.route.set(app.route('advevents'));
      if (this.attrs.modal) {
        this.attrs.modal.hide();
      }
    });
  }
}
