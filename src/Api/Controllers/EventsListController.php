<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractListController;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
use Illuminate\Support\Arr;
use Tobscure\JsonApi\Document;
use Webbinaro\AdvCalendar\Event as AdvEvent;

class EventsListController extends AbstractListController
{
    /**
     * @var string
     */
    public $serializer = EventSerializer::class;
    public $include = ['user'];
    protected function data(Request $request, Document $document)
    {
        //$relations = $this->extractInclude($request);
        //var_dump($request);
        $starting = Arr::get($request->getQueryParams(), 'start',Carbon::now());
        $ending = Arr::get($request->getQueryParams(), 'end',Carbon::now()->endOfMonth());
        return AdvEvent::whereBetween('event_start', [$starting, $ending])->get();

    }
}
