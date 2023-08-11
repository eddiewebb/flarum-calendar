import app from 'flarum/forum/app';

export default class CalendarState {
  constructor(calendar, calendarPage) {
    this.calendar = calendar;
    this.events = null;
    this.info = null;
  }

  refresh(clear = true) {
    if (clear) {
      this.events = null;
      this.info = null;
    }

    this.calendar.refetchEvents();
  }

  async getEvents(info, successCallback, failureCallbacks) {
    if (info && ((this.info?.startStr != info.startStr && this.info?.endStr != info.endStr) || !this.events)) {
      this.info = info;
      this.successCallback = successCallback;
      await this.fetchEvents(info, successCallback, failureCallbacks);
    }

    return this.events || [];
  }

  async fetchEvents(info, successCallback, failureCallbacks) {
    const results = await app.store.find('events', {
      start: info.start.toISOString(),
      end: info.end.toISOString(),
      sort: 'event_start',
    });

    this.events = results;
    successCallback(results);
  }
}
