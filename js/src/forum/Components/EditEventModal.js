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
      this.user = m.prop('');
      this.description = m.prop('');
      this.event_start = m.prop();
      this.event_end = m.prop();
      if (this.props.event) {
        const event = this.props.event;
        this.name(event.name());
        this.description(event.description());
        this.user(event.user())
        this.event_start(event.event_start());
        this.event_end(event.event_end() ? event.event_end() : event.event_start());
      }
    }


  /**
   * Builder to create new modal *with empty event* but pre-populated date field.
    * @param startDate
   * @returns {EditEventModal}
   */
  withStart(startDate)
  {
    this.event_start(startDate);
    return this;
  }

  title() {
    return this.name()?"Edit event details":"Create new calendar event";
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
      defaultDate: [flatpickr.parseDate(this.event_start(),"Y-m-d h:i K"),flatpickr.parseDate(this.event_end(),"Y-m-d h:i K")],
      //inline: true
      onChange: dates => {
        this.event_start(dates[0]);
        this.event_end(dates[1])
      }
    });
  }

  config(isInitialized, context){
    this.configDatePicker("#startpicker",isInitialized);
  }


  onsubmit(e) {
    e.preventDefault();
    if (!this.name() || !this.description() ) {

      app.alerts.show(new Alert({children:"Events require a name and description"}));
      return;
    }
    if(!this.props.event){
      this.props.event = app.store.createRecord('events');
    }
    this.props.event.save({
      name: this.name(),
      description: this.description(),
      event_start: this.event_start(),
      event_end: this.event_end()
    }).then(this.hide());

  }

}
