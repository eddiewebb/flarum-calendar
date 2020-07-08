<?php

namespace Webbinaro\AdvCalendar;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\User\User;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property User $user
 * @property int $user_id
 * @property \Carbon\Carbon $event_start
 * @property \Carbon\Carbon $event_end
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
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
        'event_end',
    ];

    /**
     * @param $name
     * @param $description
     * @param $actorId
     * @param $event_start
     * @param $event_end
     *
     * @return static
     */
    public static function build($name, $description, $actorId, $event_start,$event_end)
    {
        $event = new static();

        $event->name = $name;
        $event->description = $description;
        $event->user_id = $actorId;
        $event->event_start = $event_start;
        $event->event_end = $event_end;

        return $event;
    }

    /**
     * @return bool
     */
    public function hasEnded()
    {
        return $this->event_end !== null && $this->event_end->isPast();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
