<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Event;
use Flarum\User\Exception\PermissionDeniedException;

class EventsCreateController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;
    public $include = ['user'];

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        if (!$actor->can('event.create')) {
            throw new PermissionDeniedException();
        }
        $requestData = Arr::get($request->getParsedBody(), 'data.attributes');
        $event = Event::build($requestData['name'], $requestData['description'], $actor->id, $requestData['event_start'], $requestData['event_end']);
        $event->saveOrFail();
        return $event;
    }
}
