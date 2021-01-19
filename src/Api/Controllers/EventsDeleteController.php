<?php


namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;
use Webbinaro\AdvCalendar\Event as AdvEvent;

class EventsDeleteController extends AbstractDeleteController
{
    protected function delete(Request $request)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $actor->assertRegistered();
        $event = AdvEvent::findOrFail($id);
        if(! $actor->can('event.moderate') && $actor->id !== $event->user->id ) {
            throw new PermissionDeniedException("non moderator unowned event");
        }
        $event->delete();
    }
}
