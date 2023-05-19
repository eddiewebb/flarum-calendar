<?php

namespace Webbinaro\AdvCalendar\Integrations;

use Webbinaro\AdvCalendar\Event as Model;
use FoF\Sitemap\Resources\Resource;
use FoF\Sitemap\Sitemap\Frequency;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class EventResource extends Resource
{
    public function query(): Builder
    {
        return Model::query();
    }

    public function url($model): string
    {
        return $this->generateRouteUrl('advevent', [
            'id' => $model['id'],
        ]);
    }

    public function priority(): float
    {
        return 0.7;
    }

    public function frequency(): string
    {
        return Frequency::DAILY;
    }

    public function lastModifiedAt($model): Carbon
    {
        return $model->updated_at;
    }
}
