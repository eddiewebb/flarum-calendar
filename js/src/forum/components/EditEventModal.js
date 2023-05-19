import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import dynamicallyLoadLib from '../utils/dynamicallyLoadLib';
import Stream from 'flarum/common/utils/Stream';
import CustomComposerState from '../states/CustomComposerState';
import TextEditor from 'flarum/common/components/TextEditor';
import app from 'flarum/forum/app';

const name = Stream('');
const user = Stream('');
const description = Stream('');
const event_start = Stream();
const event_end = Stream();

/**
 * This builds event details based on a FullCalendar concept of object.  CalendarPage talks to api, sends us FC payload
 */
export default class EditEventModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    if (this.attrs.event) {
      const event = this.attrs.event;
      name(event.name());
      description(event.description());
      user(event.user());
      event_start(event.event_start());
      event_end(event.event_end() ? event.event_end() : event.event_start());
    }

    this.composerState = new CustomComposerState();
  }

  title() {
    return name() ? app.translator.trans('flarum-calendar.forum.modal.title_edit') : app.translator.trans('flarum-calendar.forum.modal.title_create');
  }

  className() {
    return 'EditEventsModal Modal--large';
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.title_label')}</label>
          <input type="text" name="title" className="FormControl" bidi={name} />
        </div>
        <div className="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.dates_label')}</label>
          <div className="PollModal--date">
            <input style="opacity: 1; color: inherit" className="FormControl" data-input oncreate={this.initDatePicker} />
          </div>
        </div>
        <div class="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.description_label')}</label>
          <div className="Composer">
            <TextEditor
              disabled={this.loading}
              value={description()}
              onchange={description}
              placeholder={app.translator.trans('flarum-calendar.forum.modal.description_placeholder')}
              composer={this.composerState}
            />
          </div>
        </div>
        <div className="Form-group">
          <Button type="submit" className="Button Button--primary PollModal-SubmitButton" loading={this.loading}>
            {app.translator.trans('flarum-calendar.forum.modal.submit')}
          </Button>
        </div>
      </div>,
    ];
  }

  async initDatePicker(vnode) {
    const userLang = app.translator.getLocale();

    await dynamicallyLoadLib('flatpickr');
    await dynamicallyLoadLib('flatpickrLocale', userLang);

    const locale = flatpickr.l10ns[userLang];

    flatpickr(vnode.dom, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      mode: 'range',
      locale,
      defaultDate: [flatpickr.parseDate(event_start(), 'Y-m-d h:i K'), flatpickr.parseDate(event_end(), 'Y-m-d h:i K')],
      inline: true,
      onChange: (dates) => {
        event_start(dates[0]);
        event_end(dates[1]);
      },
    });

    m.redraw();
  }

  async onsubmit(e) {
    e.preventDefault();
    if (!name() || !description()) {
      app.alerts.show(Alert, { type: 'error' }, app.translator.trans('flarum-calendar.forum.modal.requirement_message'));
      return;
    }
    if (!this.attrs.event) {
      this.attrs.event = app.store.createRecord('events');
    }

    await this.attrs.event.save({
      name: name(),
      description: description(),
      event_start: event_start(),
      event_end: event_end(),
    });

    this.hide();
  }
}
