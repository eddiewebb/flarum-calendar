# ADV Events (Calendar)

![License](https://img.shields.io/badge/license-MIT-blue.svg) 
[![Latest Stable Version](https://img.shields.io/packagist/v/webbinaro/flarum-calendar.svg)](https://packagist.org/packages/webbinaro/flarum-calendar)

A [Flarum](http://flarum.org) extension. 
Adds Events Calendars to share and plan community activities, webinars, etc.

** Work In Progress **
Collaborators welcome!

#### Done!
- [x] Data model and DB migrations
- [x] API to CR ~~UD~~ events
- [x] New UI route to calendar
- [x] JS Frontend (I was exploring ["fullcalendar"](https://fullcalendar.io/) as a nice looking option) 
- [x] Events details modal or page (exists, can be prettier)
- [x] Events create modal or page
- [x] API to update/delete events 
- [x] Permissions to add (owners can edit/delete)
- [x] Permission to moderate (edit/delete other's events)
- [x] mobile view is broke

#### In Progress
- [ ] Pondering - SEO content, how to do this..perhaps replacemmodal 
        (perhaps replace modeal with discussionpage)
  
#### Up Next 
- [ ] Hosts and Attendees (currently just actor)

#### Open Decisions
- [ ] Relationships 
    - should they be linked to discussions like polls or free
    - roles: single owner, what about hosts, attendees, what are the cardinality

### Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually with composer:

```sh
composer require webbinaro/flarum-calendar
```

### Updating

```sh
composer update webbinaro/flarum-calendar
```

### Links

- [Packagist](https://packagist.org/packages/webbinaro/flarum-calendar)
