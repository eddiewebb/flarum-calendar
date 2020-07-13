import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import flatpickr from 'flatpickr';
require("flatpickr/dist/flatpickr.css");


/**
 * THis builds event details based on a FullCalendar concept of object.  CalendarPage talks to api, sends us FC payload
 */
export default class EditEventModal extends Modal{


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
      this.eventId(event.extendedProps.eventId);
      this.name(event.title);
      this.description(event.extendedProps.description);
      this.user(event.extendedProps.user)
      this.start(event.start );
      this.end(event.end );
    }
  }

  withStart(startDate)
  {
    this.start(startDate);
    return this;
  }

  title() {
    return "Create new calendar event";
  }

  className() {
    return 'EditEventsModal Modal--small';
  }


  content() {
    return [
      <div className="Modal-body">
        <input type="hidden" name="id" bidi={this.eventId} />
        <div className="Form-group">
          <label className="label">What</label>
          <input type="text" name="title" className="FormControl" bidi={this.name} />
        </div>
        <div className="Form-group">
          <label className="label">When</label>

          <div className="PollModal--date" >
            <input id="startpicker" style="opacity: 1; color: inherit" className="FormControl" data-input />
          </div>
        </div>
        <div className="Form-group">
          <label className="label">Details</label>
          <textarea type="text" name="description" className="FormControl" bidi={this.description} />
          <small>You may use markdown</small>
        </div>
        <div className="Form-group">
          {Button.component({
            type: 'submit',
            className: 'Button Button--primary PollModal-SubmitButton',
            children: app.translator.trans('flarum-calendar.forum.modal.submit'),
            loading: this.loading,
          })}
        </div>
      </div>,
    ];
  }

  configDatePicker(el, isInitialized) {
    flatpickr(el, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      mode: "range",
      defaultDate: [flatpickr.parseDate(this.start(),"Y-m-d h:i K"),flatpickr.parseDate(this.end(),"Y-m-d h:i K")],
      //inline: true
      onChange: dates => {
        this.start(dates[0]);
        this.end(dates[1])
      }
    });
  }

  config(isInitialized){
    this.configDatePicker("#startpicker",isInitialized);
  }


  onsubmit(e) {
    e.preventDefault();
    if (this.name() === '' || this.description() === '') {
      alert("Please provide an event name and description");
      return;
    }
    let eventRecord = app.store.getById('events',this.eventId());
    if (!eventRecord){
      console.log("submitting new event")
      eventRecord = app.store.createRecord('events');
    }
    eventRecord.save({
      name: this.name(),
      description: this.description(),
      event_start: flatpickr.parseDate(this.start(),"Y-m-d h:i K"),
      event_end: flatpickr.parseDate(this.end(),"Y-m-d h:i K"),
    }).then(result => {
        console.log(result);
        this.hide();
      }
    ).catch(
      console.log
    );


  }

}
