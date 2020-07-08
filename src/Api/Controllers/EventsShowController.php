<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Webbinaro\AdvCalendar\Event;

class EventsShowController extends AbstractShowController
{
    public $serializer = EventSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $id = array_get($request->getQueryParams(), 'id');

        return Event::findOrFail($id);
    }
}
