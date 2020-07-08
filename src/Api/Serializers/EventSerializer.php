<?php
namespace Webbinaro\AdvCalendar\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
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
            'name'    => $event->name,
            'description'    => $event->description,
            'hasEnded'    => $event->hasEnded(),
            'endDate'     => $this->formatDate($event->event_end),
            'createdAt'   => $this->formatDate($event->created_at),
            'updatedAt'   => $this->formatDate($event->updated_at),
        ];
    }

}
