<?php

/*
 * This file is part of webbinaro/adv-extras.
 *
 * Copyright (c) 2020 Eddie Webbinaro.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Webbinaro\AdvCalendar;

use Flarum\Extend;
use Webbinaro\AdvCalendar\Api\Controllers as ControllersAlias;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    (new Extend\Routes('api'))
    	->get('/events','events.index', ControllersAlias\EventsListController::class)
    	->get('/events/{id}','events.show', ControllersAlias\EventsShowController::class)
    	->post('/events','events.create', ControllersAlias\EventsCreateController::class),
];


