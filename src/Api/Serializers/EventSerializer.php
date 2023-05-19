<?php

namespace Webbinaro\AdvCalendar\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Webbinaro\AdvCalendar\Event;

class EventSerializer extends AbstractSerializer
{

    /**
     * @var string
     */
    protected $type = 'events';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Event $event
     *
     * @return array
     */
    protected function getDefaultAttributes($event)
    {
        return [
            'name'        => $event->name,
            'description' => $event->description,
            'event_start' => $this->formatDate($event->event_start),
            'event_end'   => $this->formatDate($event->event_end),
            'createdAt'   => $this->formatDate($event->created_at),
            'updatedAt'   => $this->formatDate($event->updated_at),
        ];
    }

    protected function user($event)
    {
        return $this->hasOne($event, UserSerializer::class);
    }
}
