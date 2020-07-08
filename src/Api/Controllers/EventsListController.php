<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Webbinaro\AdvCalendar\Api\Serializers\EventSerializer;
use Psr\Http\Message\ServerRequestInterface as Request;
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
        return AdvEvent::all();
    }
}
