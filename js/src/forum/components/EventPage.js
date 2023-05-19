import Page from 'flarum/common/components/Page';
import AffixedSidebar from 'flarum/forum/components/AffixedSidebar';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import listItems from 'flarum/common/helpers/listItems';
import EventFragment from './EventFragment';
import app from 'flarum/forum/app';
import CalendarPage from './CalendarPage';

/**
 * The `EventPage` component shows a individual event details
 *
 * @abstract
 */
export default class EventPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.event = null;

    const event = app.preloadedApiDocument();
    if (event) {
      this.show(event);
    } else {
      const eventId = m.route.param('id');
      app.store.find('events', eventId).then(this.show.bind(this));
    }

    app.history.push('advevent');
    this.bodyClass = 'App--event';
  }

  show(event) {
    this.event = event;
    this.user = event.user();
    app.setTitle(event.name());
    m.redraw();
  }

  view() {
    return (
      <div className="EventPage">
        {this.event ? (
          <div className="container">
            <div className="sideNavContainer">
              <AffixedSidebar>
                <nav className="IndexPage-nav sideNav">
                  <ul>{listItems(CalendarPage.prototype.sidebarItems().toArray())}</ul>
                </nav>
              </AffixedSidebar>
              <div className="sideNavOffset IndexPage-results">
                <h2>{this.event.name()}</h2>
                <EventFragment event={this.event} />
              </div>
            </div>
          </div>
        ) : (
          <LoadingIndicator className="LoadingIndicator--block" />
        )}
      </div>
    );
  }
}
