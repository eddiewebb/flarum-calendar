import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import LinkButton from 'flarum/common/components/LinkButton';
import avatar from 'flarum/common/helpers/avatar';
import EventFragment from './EventFragment';
import app from 'flarum/forum/app';
import Alert from 'flarum/common/components/Alert';

/**
 * This is intended as a "teaser" to link to full event page
 */
export default class EventTeaser extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
  }

  title() {
    return this.attrs.event.name();
  }

  /*
   * Override parent modal so we can have avatar in title bar
   */
  view() {
    if (this.alertAttrs) {
      this.alertAttrs.dismissible = false;
    }

    return [
      <div className={'Modal modal-dialog ' + this.className()}>
        <div className="Modal-content">
          {this.constructor.isDismissible ? (
            <div className="Modal-close App-backControl">
              <Button icon="fas fa-times" onclick={this.hide.bind(this)} className="Button Button--icon Button--link" />
            </div>
          ) : (
            ''
          )}

          <form onsubmit={this.onsubmit.bind(this)}>
            <div className="Modal-header">
              <div>
                <h3 className="fa-pull-left App-titleControl App-titleControl--text" style="margin-right:1em">
                  {this.title()}
                </h3>
              </div>
              <div className="fa-pull-right">{avatar(this.attrs.event.user())}</div>
              <div style="clear:both"></div>
            </div>

            {this.alertAttrs && (
              <div className="Modal-alert">
                <Alert {...this.alertAttrs} />
              </div>
            )}
            <div className="Modal-body">
              <EventFragment event={this.attrs.event} modal={this} />
              <p>
                <LinkButton href={app.route.advevent(this.attrs.event)}>{app.translator.trans('flarum-calendar.forum.event.details')}</LinkButton>
              </p>
            </div>
          </form>
        </div>
      </div>,
    ];
  }
}
