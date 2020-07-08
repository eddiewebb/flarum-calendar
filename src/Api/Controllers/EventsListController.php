<?php 

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;

class EventsListController extends AbstractListController
{
    public $serializer = EventSerializer::class;
    
    protected function data(Request $request, Document $document)
    {
        return Event::all();
    }
}