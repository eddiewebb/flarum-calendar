<?php

namespace Webbinaro\AdvCalendar;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\User\User;

/**
 * @property int $id
 * @property string $question
 * @property bool $public_poll
 * @property Discussion $discussion
 * @property USer $user
 * @property int $discussion_id
 * @property int $user_id
 * @property \Carbon\Carbon $end_date
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
        $poll = new static();

        $poll->name = $name;
        $poll->description = $description;
        $poll->user_id = $actorId;
        $poll->event_start = $startDate;
        $poll->event_end = $endDate;

        return $poll;
    }

    /**
     * @return bool
     */
    public function hasEnded()
    {
        return $this->end_date !== null && $this->end_date->isPast();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}