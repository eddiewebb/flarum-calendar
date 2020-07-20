<?php


namespace Webbinaro\AdvCalendar\Integrations;
use Flarum\User\Guest;
use Webbinaro\AdvCalendar\Event as Model;
use FoF\Sitemap\Resources\Resource;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class SitemapsResource extends Resource
{

    public function __construct()
    {
        print('constructed');
    }

    public function query(): Builder
    {
        print('queried');
        return Model::query();
    }

    public function url($model): string
    {
        print('ddd');
        return $this->generateRouteUrl('advevent', [
            'id' => $model->id(),
        ]);
    }

    public function priority(): float
    {
        print('ddd');
        return 0.7;
    }

    public function frequency(): string
    {
        return Frequency::DAILY;
    }

    public function lastModifiedAt($model): Carbon
    {
        print('ddd');
        return $model->updated_at;
    }
}
