import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';
import EditEventModal from "./EditEventModal";
import Alert from 'flarum/components/Alert'
import fullTime from 'flarum/helpers/fullTime';

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
      return <div>
        <p id="eventdescription"/>
        <p>Hosted by: <a href={app.route.user(this.attrs.event.user())} config={m.route}>
          {userOnline(this.attrs.event.user())}
          {username(this.attrs.event.user())}
        </a></p>
        <p>
          Starts: { fullTime(this.attrs.event.event_start()) } <br/>
          Ends: { fullTime(this.attrs.event.event_end())}
        </p>
        {(app.session.user && (app.session.user.canModerateEvents() || this.attrs.event.user.id === app.session.user.id)) ?
          (<div>
              {Button.component({
                icon: 'fas fa-edit',
                onclick: this.editLaunch.bind(this),
                className: 'Button Button--icon Button--link',
              })},
              {Button.component({
                icon: 'fas fa-trash-alt',
                onclick: this.deleteEvent.bind(this),
                className: 'Button Button--icon Button--link',
              })}
            </div>
          ) : ''
        }
      </div>
  }

  oncreate(vnode) {
    const descElement = document.getElementById("eventdescription");
    s9e.TextFormatter.preview(this.attrs.event.description(), descElement);
  }

  editLaunch() {
    console.log({"message": "[webbinaro/flarum-calendar] edit event ", "props": this.attrs.event})
    app.modal.show(
      EditEventModal, {"event": this.attrs.event}
    );
  }

  deleteEvent() {
    console.log({"message": "[webbinaro/flarum-calendar] delete event ", "event": this.attrs.event})
    const events = this.attrs.events;
    this.attrs.event.delete().then(()=>{
      app.alerts.show("Event Deleted");
      m.route(app.route('advevents'));
      //app.history.back();
    });
  }

}
