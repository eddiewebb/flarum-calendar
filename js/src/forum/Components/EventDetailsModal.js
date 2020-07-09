import Modal from 'flarum/components/Modal';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
export default class EventDetailsModal extends Modal {


  init() {
    super.init();
    this.title = m.prop('');
    this.description = m.prop('');
    this.user = m.prop('');
    this.event_start = m.prop();
    this.event_end = m.prop();
    if (this.props.event) {
      const event = this.props.event;

      this.title(event.title);
      this.description(event.extendedProps.description);
      this.user(event.extendedProps.user)
      this.event_start(event.event_start );
      this.event_end(!event.event_end || isNaN(event.event_end.getTime()) ? null : event.event_end);
    }
  }

  title() {
    return this.title;
  }

  className() {
    return 'EventDetailsModal Modal--small';
  }


  content() {
    const user = new User( this.props.event.extendedProps.user.attributes);
    console.log(user);
    return [
      <div className="Modal-body">
        <p>{this.props.event.extendedProps.description}</p>


        <p>Hosted by: <a href={app.route.user(user)} config={m.route}>
          {userOnline(user)}
          {username(user)}
        </a></p>
      </div>,
    ];
  }

}
