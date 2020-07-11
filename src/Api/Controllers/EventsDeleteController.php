<?php


namespace Webbinaro\AdvCalendar\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\User\AssertPermissionTrait;
use Webbinaro\AdvCalendar\Event as AdvEvent;

class EventsDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;
    protected function delete(Request $request)
    {
        $id = array_get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $this->assertRegistered($actor);
        $this->assertAdmin($actor);
        AdvEvent::findOrFail($id)->delete();
    }
}
