<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Illuminate\Support\Arr;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\Exception\PermissionDeniedException;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Event;
use Flarum\User\User;

class EventsUpdateController extends AbstractShowController
{
    public $serializer = EventSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $actor->assertRegistered();
        $requestData = Arr::get($request->getParsedBody(), 'data.attributes');

        $event = Event::findOrFail($id);

        if(! $actor->can('event.moderate') && $actor->id !== $event->user->id ) {
            throw new PermissionDeniedException("non moderator unowned event");
        }
        $event->replace($requestData['name'],$requestData['description'],$requestData['event_start'], $requestData['event_end']);
        $event->save();
        return $event;
    }
}
