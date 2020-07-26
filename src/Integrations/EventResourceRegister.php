<?php


namespace Webbinaro\AdvCalendar\Integrations;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use FoF\Sitemap\Resources\Resource;
use Illuminate\Contracts\Container\Container;
use InvalidArgumentException;

/**
 * Class EventResourceRegister
 * @package Webbinaro\AdvCalendar\Integrations
 * Purely a copy and workaround of the reigster function form fof/sitemaps
 * until https://github.com/FriendsOfFlarum/sitemap/pull/15 is fixed
 */
class EventResourceRegister implements ExtenderInterface
{

    public function extend(Container $container, Extension $extension = null)
    {
        $container->extend('fof.sitemap.resources', function (array $resources) use ($container) {
            $resource = $container->make(EventResource::class);

            if ($resource instanceof Resource) {
                $resources[] = $resource;
            } else {
                throw new InvalidArgumentException("{EventResource::class} has to extend ".Resource::class);
            }

            return $resources;
        });
    }
}
