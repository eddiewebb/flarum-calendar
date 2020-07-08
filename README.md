# ADV Events (Calendar)

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/webbinaro/adv-extras.svg)](https://packagist.org/packages/webbinaro/adv-extras)

A [Flarum](http://flarum.org) extension. adds adv extras like route sharing

** Work In Progress **
Collaborators welcome!

In Progress
- [x] Data model and DB migrations
- [ ] API to CRUD events
  
Up Next / Need Help
- [ ] New UI route to CRUD event 
- [ ] JS Frontend (I was exploring ["fullcalendar"](https://fullcalendar.io/) as a nice looking option) 

Decisions
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

- [Packagist](https://packagist.org/packages/webbinaro/adv-extras)
