<?php
namespace Webbinaro\AdvCalendar\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserSerializer;

class DiscussionSerializer extends AbstractSerializer
{
    protected $type = 'events';

    protected function getDefaultAttributes($poll)
    {
        return [
            'name'    => $poll->name,
            'description'    => $poll->description,
            'hasEnded'    => $poll->hasEnded(),
            'endDate'     => $this->formatDate($poll->event_end),
            'createdAt'   => $this->formatDate($poll->created_at),
            'updatedAt'   => $this->formatDate($poll->updated_at),
        ];
    }


    protected function user($event)
    {
        return $this->hasOne($event, UserSerializer::class);
    }
}