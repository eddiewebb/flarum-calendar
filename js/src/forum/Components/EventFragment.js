import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';
import EditEventModal from "./EditEventModal";
import Alert from 'flarum/components/Alert'


export default class EventFragment extends Component {

  init() {
    super.init();
  }

  title() {
    return this.props.event.name();
  }

  className() {
    return 'EventDetailsModal Modal--small';
  }


  view() {
      return <div className="Modal-body">
        <p id="eventdescription"/>
        <p>Hosted by: <a href={app.route.user(this.props.event.user())} config={m.route}>
          {userOnline(this.props.event.user())}
          {username(this.props.event.user())}
        </a></p>
        <p>{this.props.event.event_start().toLocaleDateString() + ", " + this.props.event.event_start().toLocaleTimeString()} - {this.props.event.event_end().toLocaleDateString() + ", " + this.props.event.event_end().toLocaleTimeString()}</p>
        {(app.session.user && (app.session.user.canModerateEvents() || this.props.event.user.id === app.session.user.id)) ?
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

  config() {
    const descElement = document.getElementById("eventdescription");
    s9e.TextFormatter.preview(this.props.event.description(), descElement);
  }


  editLaunch() {
    console.log({"message": "[webbinaro/flarum-calendar] edit event ", "props": this.props})
    app.modal.show(
      new EditEventModal({"event": this.props.event})
    );

  }

  deleteEvent() {
    console.log({"message": "[webbinaro/flarum-calendar] delete event ", "event": this.props})
    const events = this.props.events;
    this.props.event.delete().then(()=>{
      app.alerts.show(new Alert({children:"Event Deleted"}));
      app.history.back();
    });
  }

}
