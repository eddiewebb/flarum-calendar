<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\Exception\PermissionDeniedException;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Event;
use Flarum\User\AssertPermissionTrait;

class EventsUpdateController extends AbstractShowController
{
    use AssertPermissionTrait;
    public $serializer = EventSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $id = array_get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $this->assertRegistered($actor);
        $this->assertAdmin($actor);
        $requestData = array_get($request->getParsedBody(), 'data.attributes');

        $event = Event::findOrFail($id);
        if( $event->user_id != $actor->id){
            throw new PermissionDeniedException("That is not your event.");
        }
        $event->replace($requestData['name'],$requestData['description'],$requestData['event_start'], $requestData['event_end']);
       /* $event->name = $requestData['name'];
        $event->description = $requestData['description'];
        $event->event_start = $requestData['event_start'];
        $event->event_end = $requestData['event_end']*/;
        $event->save();

    }
}
