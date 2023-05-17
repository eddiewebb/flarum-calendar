<?php

/*
 * This file is copied from and based on Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Webbinaro\AdvCalendar\Content;

use Flarum\Api\Client;
use Flarum\Frontend\Document;
use Flarum\Http\Exception\RouteNotFoundException;
use Flarum\Http\UrlGenerator;
use Flarum\User\User as FlarumUser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class Event
{
    /**
     * @var Client
     */
    protected $api;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @param Client $api
     * @param UrlGenerator $url
     */
    public function __construct(Client $api, UrlGenerator $url)
    {
        $this->api = $api;
        $this->url = $url;
    }

    public function __invoke(Document $document, Request $request)
    {
        $queryParams = $request->getQueryParams();
        $eventId = Arr::get($queryParams, 'id');

        $apiDocument = $this->getApiDocument($request, $eventId);
        $event = $apiDocument->data->attributes;

        $document->title = $event->name;
        $document->canonicalUrl = $this->url->to('forum')->route('advevent', ['id' => $eventId]);



        $document->payload['apiDocument'] = $apiDocument;
        return $document;
    }

    /**
     * Get the result of an API request to show a user.
     *
     * @param FlarumUser $actor
     * @param array $params
     * @return object
     * @throws ModelNotFoundException
     */
    protected function getApiDocument(Request $request, string $id)
    {
        $response = $this->api
            ->withParentRequest($request)
            ->get("/events/$id");
        $statusCode = $response->getStatusCode();

        if ($statusCode === 404) {
            throw new RouteNotFoundException;
        }

        return json_decode($response->getBody());
    }
}
