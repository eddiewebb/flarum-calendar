import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';
import EditEventModal from "./EditEventModal";

import flatpickr from 'flatpickr';


export default class EventDetailsModal extends Modal {

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
      console.log(flatpickr.parseDate(event.end,"Y-m-d h:i K"))
      this.eventId(event.extendedProps.eventId);
      this.name(event.title);
      this.description(event.extendedProps.description);
      this.user(event.extendedProps.user)
      this.start(event.start);
      this.end(event.end?event.end:event.start);
    }
  }

  title() {
   return  this.name();
  }

  className() {
    return 'EventDetailsModal Modal--small';
  }


  content() {
    return [
      <div className="Modal-body">
        <p id="eventdescription"/>
        <p>Hosted by: <a href={app.route.user(this.user())} config={m.route}>
          {userOnline(this.user())}
          {username(this.user())}
        </a></p>
        <p>{this.start().toLocaleDateString() + ", " + this.start().toLocaleTimeString()} - {this.end().toLocaleDateString() + ", " + this.end().toLocaleTimeString()}</p>
          { (app.session.user && (app.session.user.canModerateEvents() || this.user.id === app.session.user.id)) ?
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
            ): ''
          }
      </div>,
    ];
  }

  config(){
    const descElement = document.getElementById("eventdescription");
    s9e.TextFormatter.preview(this.description(),descElement);
  }

  /*
  * Override parent modal so we can have avatar in title bar
   */

  view() {
    if (this.alertAttrs) {
      this.alertAttrs.dismissible = false;
    }

    return (
      <div className={'Modal modal-dialog ' + this.className()}>
        <div className="Modal-content">
          {this.constructor.isDismissible ? (
            <div className="Modal-close App-backControl">
              {Button.component({
                icon: 'fas fa-times',
                onclick: this.hide.bind(this),
                className: 'Button Button--icon Button--link',
              })}
            </div>
          ) : (
            ''
          )}

          <form onsubmit={this.onsubmit.bind(this)}>
            <div className="Modal-header">
                <div>
                  <h3 className="fa-pull-left App-titleControl App-titleControl--text" style="margin-right:1em">{this.title()}</h3>
                </div>
                <div className="fa-pull-right" >{avatar(this.user())}</div>
                <div style="clear:both">
              </div>
            </div>

            {this.alertAttrs ? <div className="Modal-alert">{Alert.component(this.alertAttrs)}</div> : ''}

            {this.content()}
          </form>
        </div>
      </div>
    );
  }

  editLaunch(){
    console.log({"message":"[webbinaro/flarum-calendar] edit event ","event":this.props})
    app.modal.show(
      new EditEventModal({"event":this.props.event,"calendar":this.props.calendar,"events":this.props.events})
    );
  }

  deleteEvent(){
    console.log({"message":"[webbinaro/flarum-calendar] delete event ","event":this.props})
    const events = this.props.events;
    const calendar = this.props.calendar;
    let eventRecord = app.store.getById('events',this.eventId());
    eventRecord.delete().then(function() {
      for(var eventIndex in events)
      {
        if (events[eventIndex].data.id === eventRecord.id()) {
          events.splice(eventIndex, 1);
          break;
        }
      }
      calendar.removeAllEvents();
      calendar.addEventSource(events);
      this.hide()
    }.bind(this) );
  }




}
