<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Webbinaro\AdvCalendar\Event;

class EventsShowController extends AbstractShowController
{
    public $serializer = EventSerializer::class;
    public $include = ['user'];
    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('event.view');

        $id = Arr::get($request->getQueryParams(), 'id');
        //$relations = $this->extractInclude($request);
        return Event::findOrFail($id);
    }
}
