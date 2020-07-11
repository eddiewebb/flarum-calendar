<?php

namespace Webbinaro\AdvCalendar;

use Flarum\Database\AbstractModel;
use Flarum\User\User;
use Carbon\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property User $user
 * @property int $user_id
 * @property Carbon $event_start
 * @property Carbon $event_end
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class Event extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    public $timestamps = true;

    protected $dates = [
        'created_at',
        'updated_at',
        'event_start',
        'event_end'
    ];

    /**
     * @param $name
     * @param $description
     * @param $actorId
     * @param  $event_start
     * @param  $event_end
     *
     * @return static
     */
    public static function build($name, $description, $actorId, $event_start,$event_end)
    {
        $event = new static();

        $event->name = $name;
        $event->description = $description;
        $event->user_id = $actorId;
        $event->event_start = new Carbon($event_start);
        $event->event_end = new Carbon($event_end);

        return $event;
    }

    /**
     * Used by update controller to keep and conversion logic here.
     * @param $name
     * @param $description
     * @param $actorId
     * @param  $event_start
     * @param  $event_end
     *
     * @return static
     */
    public function replace($name, $description, $event_start,$event_end)
    {
        $this->name = $name;
        $this->description = $description;
        $this->event_start = new Carbon($event_start);
        $this->event_end = new Carbon($event_end);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
