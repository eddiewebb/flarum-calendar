<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
       	$schema->create('events', function (Blueprint $table) {
		    $table->increments('id');
		    $table->integer('user_id')->unsigned();
		    $table->string('name');
		    $table->longText('description');
            $table->timestamps();
		    $table->dateTime('event_start');
		    $table->dateTime('event_end');

		    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
		});
    },
    'down' => function (Builder $schema) { $schema->dropIfExists('events'); }
];


