import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import flatpickr from 'flatpickr';
import Stream from 'flarum/utils/Stream';
import CustomComposerState from '../States/CustomCompoerState';
import TextEditor from 'flarum/common/components/TextEditor';
require("flatpickr/dist/flatpickr.css");

const name = Stream('');
const user = Stream('');
const description = Stream('');
const event_start = Stream();
const event_end = Stream();

/**
 * THis builds event details based on a FullCalendar concept of object.  CalendarPage talks to api, sends us FC payload
 */
export default class EditEventModal extends Modal {
    oninit(vnode) {
      super.oninit(vnode);

      if (this.attrs.event) {
        const event = this.attrs.event;
        name(event.name());
        description(event.description());
        user(event.user())
        event_start(event.event_start());
        event_end(event.event_end() ? event.event_end() : event.event_start());
      }

      this.composerState = new CustomComposerState();
    }

  /**
   * Builder to create new modal *with empty event* but pre-populated date field.
    * @param startDate
   * @returns {EditEventModal}
   *//*
  withStart(startDate)
  {
    event_start(startDate);
    return this;
  }*/

  title() {
    return name() ? "Edit event details" : "Create new calendar event";
  }

  className() {
    return 'EditEventsModal Modal--large';
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form-group">
          <label className="label">What</label>
          <input type="text" name="title" className="FormControl" bidi={name} />
        </div>
        <div className="Form-group">
          <label className="label">When</label>
          <div className="PollModal--date" >
            <input id="startpicker" style="opacity: 1; color: inherit" className="FormControl" data-input />
          </div>
        </div>
        <div class="Form-group">
          <label className="label">Details</label>
          <div className='Composer'>
            <TextEditor
              disabled={this.loading}
              value={description()}
              onchange={description}
              placeholder={'Event description'}
              composer={this.composerState}
            />
          </div>
        </div>
        <div className="Form-group">
          {Button.component({
            type: 'submit',
            className: 'Button Button--primary PollModal-SubmitButton',
            loading: this.loading,
          }, app.translator.trans('flarum-calendar.forum.modal.submit'))}
        </div>
      </div>,
    ];
  }

  configDatePicker(el) {
    flatpickr(el, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      mode: "range",
      defaultDate: [flatpickr.parseDate(event_start(),"Y-m-d h:i K"),flatpickr.parseDate(event_end(),"Y-m-d h:i K")],
      inline: true,
      onChange: dates => {
        event_start(dates[0]);
        event_end(dates[1])
      }
    });
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    // console.log("startpicker");
    this.configDatePicker("#startpicker");
  }

  onsubmit(e) {
    e.preventDefault();
    if (!name() || !description() ) {

      app.alerts.show("Events require a name and description");
      return;
    }
    if(!this.attrs.event){
      this.attrs.event = app.store.createRecord('events');
    }
    this.attrs.event.save({
      name: name(),
      description: description(),
      event_start: event_start(),
      event_end: event_end()
    }).then(this.hide());

  }

}
