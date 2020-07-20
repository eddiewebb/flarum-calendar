import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';
import EditEventModal from "./EditEventModal";



export default class EventFragment extends Component {

  init() {
    super.init();
    this.name = m.prop('');
    this.description = m.prop('');
    this.user = m.prop('');
    this.start = m.prop();
    this.end = m.prop();
    this.eventId = m.prop();
    if (this.props.event) {
      const event = this.props.event;
      this.eventId(event.id());
      this.name(event.name());
      this.description(event.description());
      this.user(event.user())
      this.start(event.event_start());
      this.end(event.event_end() ? event.event_end() : event.event_start());
    }
  }

  title() {
    return this.name();
  }

  className() {
    return 'EventDetailsModal Modal--small';
  }


  view() {
      return <div className="Modal-body">
        <p id="eventdescription"/>
        <p>Hosted by: <a href={app.route.user(this.user())} config={m.route}>
          {userOnline(this.user())}
          {username(this.user())}
        </a></p>
        <p>{this.start().toLocaleDateString() + ", " + this.start().toLocaleTimeString()} - {this.end().toLocaleDateString() + ", " + this.end().toLocaleTimeString()}</p>
        {(app.session.user && (app.session.user.canModerateEvents() || this.user.id === app.session.user.id)) ?
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
    s9e.TextFormatter.preview(this.description(), descElement);
  }


  editLaunch() {
    console.log({"message": "[webbinaro/flarum-calendar] edit event ", "event": this.props})
    app.modal.show(
      new EditEventModal({"event": this.props.event, "calendar": this.props.calendar, "events": this.props.events})
    );
  }

  deleteEvent() {
    console.log({"message": "[webbinaro/flarum-calendar] delete event ", "event": this.props})
    const events = this.props.events;
    const calendar = this.props.calendar;
    let eventRecord = app.store.getById('events', this.eventId());
    eventRecord.delete().then(function () {
      for (var eventIndex in events) {
        if (events[eventIndex].data.id === eventRecord.id()) {
          events.splice(eventIndex, 1);
          break;
        }
      }
      calendar.removeAllEvents();
      calendar.addEventSource(events);
      this.hide()
    }.bind(this));
  }

}
