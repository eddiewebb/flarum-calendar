import Modal from 'flarum/components/Modal';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';



export default class EventDetailsModal extends Modal {

  init() {
    super.init();
    this.name = m.prop('');
    this.description = m.prop('');
    this.user = m.prop('');
    this.event_start = m.prop();
    this.event_end = m.prop();
    if (this.props.event) {
      const event = this.props.event;

      this.name(event.title);
      this.description(event.extendedProps.description);
      this.user(event.extendedProps.user)
      this.event_start(event.start);
      this.event_end(event.end);
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
        <p>{this.event_start().toLocaleDateString() + ", " + this.event_start().toLocaleTimeString()} - {this.event_end().toLocaleDateString() + ", " + this.event_end().toLocaleTimeString()}</p>
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

    const user =  this.props.event.extendedProps.user;
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





}
