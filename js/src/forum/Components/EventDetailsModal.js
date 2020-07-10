import Modal from 'flarum/components/Modal';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User'
import userOnline from 'flarum/helpers/userOnline';
import avatar from 'flarum/helpers/avatar';



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
   return  this.title;
  }

  className() {
    return 'EventDetailsModal Modal--small';
  }


  content() {
    const user =  this.props.event.extendedProps.user;
    return [
      <div className="Modal-body">
        <p id="eventdescription"/>
        <p>Hosted by: <a href={app.route.user(user)} config={m.route}>
          {userOnline(user)}
          {username(user)}
        </a></p>
      </div>,
    ];
  }

  config(){
    const descElement = document.getElementById("eventdescription");
    s9e.TextFormatter.preview(this.props.event.extendedProps.description,descElement);
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

                <div className="fa-pull-left ButtonLabel" style="margin-right:1em">{avatar(user)}</div>
                <div>
                  <h3 className="fa-pull-left App-titleControl App-titleControl--text">{this.title()}</h3>
                </div>
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
