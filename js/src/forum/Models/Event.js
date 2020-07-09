import Model from 'flarum/Model';

export default class Event extends Model {
  name = Model.attribute('name');
  description = Model.attribute('description');
  createdAt = Model.attribute('createdAt', Model.transformDate);
  event_start = Model.attribute('event_start', Model.transformDate);
  event_end = Model.attribute('event_end', Model.transformDate);
  user = Model.hasOne('user');
}
