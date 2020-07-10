<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Event;

class EventsCreateController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $requestData = array_get($request->getParsedBody(), 'data.attributes');
        $event = Event::build( $requestData['name'], $requestData['description'], $actor->id, $requestData['event_start'], $requestData['event_end'] );
        $event->saveOrFail();
    }
}
