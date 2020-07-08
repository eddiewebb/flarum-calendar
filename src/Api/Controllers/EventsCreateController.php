<?php

namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;

class EventsCreateController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;
    
    protected function data(Request $request, Document $document)
    {
        $attributes = array_get($request->getParsedBody(), 'data.attributes');
        
        return Event::create([
            'name' => array_get($attributes, 'name')
        ]);
    }
}