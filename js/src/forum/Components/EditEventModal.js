import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import flatpickr from 'flatpickr';
require("flatpickr/dist/flatpickr.css");


export default class EditEventModal extends Modal {

  init() {
    super.init();
    this.name = m.prop('');
    this.description = m.prop('');
    this.user = m.prop('');
    this.event_start = m.prop();
    this.event_end = m.prop();
    if (this.props.event) {
      const event = this.props.event;

      this.name(event.name);
      this.description(event.extendedProps.description);
      this.user(event.extendedProps.user)
      this.event_start(event.event_start );
      this.event_end(!event.event_end || isNaN(event.event_end.getTime()) ? null : event.event_end);
    }
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
          <textarea type="text" name="title" className="FormControl" bidi={this.description} />
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
    if (isInitialized) return;
    flatpickr(el, {
      enableTime: true,
      minDate: 'today',
      dateFormat: 'Y-m-d H:i',
      mode: "range",
      //inline: true
      onChange: dates => {
        this.event_start(dates[0]);
        this.event_end(dates[1])
      }
    });
  }
  config(isInitialized){
    this.configDatePicker("#startpicker",isInitialized)
  }

  onsubmit(e) {
    e.preventDefault();
    if (this.name() === '' || this.description() === '') {
      alert("Please provide an event name and description");
      return;
    }
    console.log("submitting new event")
    const eventRecord = app.store.createRecord('events');

    eventRecord.save({
      name: this.name(),
      description: this.description(),
      event_start: flatpickr.parseDate(this.event_start(),"Y-m-d h:i K"),
      event_end: flatpickr.parseDate(this.event_end(),"Y-m-d h:i K"),
    }).then(result => {
        console.log(result);
        this.hide();
      }
    ).catch(
      console.log
    );


  }

}
