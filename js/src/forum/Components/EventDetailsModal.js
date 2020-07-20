import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import avatar from 'flarum/helpers/avatar';
import EventFragment from "./EventFragment";



export default class EventDetailsModal extends Modal {

  init() {
    super.init();
  }


  title(){
    return this.props.event.name();
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
                <div className="fa-pull-right" >{avatar(this.props.event.user())}</div>
                <div style="clear:both">
              </div>
            </div>

            {this.alertAttrs ? <div className="Modal-alert">{Alert.component(this.alertAttrs)}</div> : ''}

            <EventFragment event={this.props.event}/>
          </form>
        </div>
      </div>
    );
  }




}
