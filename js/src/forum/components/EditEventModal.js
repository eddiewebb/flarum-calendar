import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import dynamicallyLoadLib from '../utils/dynamicallyLoadLib';
import Stream from 'flarum/common/utils/Stream';
import CustomComposerState from '../states/CustomComposerState';
import TextEditor from 'flarum/common/components/TextEditor';
import app from 'flarum/forum/app';

/**
 * This builds event details based on a FullCalendar concept of object.  CalendarPage talks to api, sends us FC payload
 */
export default class EditEventModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.name = Stream('');
    this.user = Stream('');
    this.description = Stream('');
    this.event_start = Stream();
    this.event_end = Stream();

    if (this.attrs.event) {
      const event = this.attrs.event;
      this.name(event.name());
      this.description(event.description());
      this.user(event.user());
      this.event_start(event.event_start());
      this.event_end(event.event_end() ? event.event_end() : event.event_start());
    }

    this.composerState = new CustomComposerState();
  }

  title() {
    return this.name()
      ? app.translator.trans('flarum-calendar.forum.modal.title_edit')
      : app.translator.trans('flarum-calendar.forum.modal.title_create');
  }

  className() {
    return 'EditEventsModal Modal--large';
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.title_label')}</label>
          <input type="text" name="title" className="FormControl" bidi={this.name} />
        </div>
        <div className="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.dates_label')}</label>
          <div className="PollModal--date">
            <input style="opacity: 1; color: inherit" className="FormControl" data-input oncreate={this.initDatePicker.bind(this)} />
          </div>
        </div>
        <div class="Form-group">
          <label className="label">{app.translator.trans('flarum-calendar.forum.modal.description_label')}</label>
          <div className="Composer">
            <TextEditor
              disabled={this.loading}
              value={this.description()}
              onchange={this.description}
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
      defaultDate: [flatpickr.parseDate(this.event_start(), 'Y-m-d h:i K'), flatpickr.parseDate(this.event_end(), 'Y-m-d h:i K')],
      inline: true,
      onChange: (dates) => {
        this.event_start(dates[0]);
        this.event_end(dates[1]);
      },
    });

    m.redraw();
  }

  async onsubmit(e) {
    e.preventDefault();
    if (!this.name() || !this.description()) {
      app.alerts.show(Alert, { type: 'error' }, app.translator.trans('flarum-calendar.forum.modal.requirement_message'));
      return;
    }
    if (!this.attrs.event) {
      this.attrs.event = app.store.createRecord('events');
    }

    await this.attrs.event.save({
      name: this.name(),
      description: this.description(),
      event_start: this.event_start(),
      event_end: this.event_end(),
    });

    this.attrs.refresh();

    this.hide();
  }
}
