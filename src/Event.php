<?php

namespace Webbinaro\AdvCalendar;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\User\User;

/**
 * @property int $id
 * @property string $question
 * @property User $user
 * @property int $user_id
 * @property \Carbon\Carbon $end_date
 * @property \Carbon\Carbon $start_date
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
     * @param $question
     * @param $discussionId
     * @param $actorId
     * @param $endDate
     * @param $publicPoll
     *
     * @return static
     */
    public static function build($name, $description, $actorId, $startDate,$endDate)
    {
        $event = new static();

        $event->name = $name;
        $event->description = $description;
        $event->user_id = $actorId;
        $event->event_start = $startDate;
        $event->event_end = $endDate;

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
