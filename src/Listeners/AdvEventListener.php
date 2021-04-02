<?php


namespace Webbinaro\AdvCalendar\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AdvEventListener
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events) {
        $events->listen(Serializing::class, [$this, 'addPermissionsToUser']);
    }

    /**
     * @param Serializing $event
     */
    public function addPermissionsToUser(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['canModerateEvents'] = $event->actor->can('event.moderate');
            $event->attributes['canStartEvents'] = $event->actor->can('event.create');
            $event->attributes['canViewEvents'] = $event->actor->can('event.view');
        }
    }

}
