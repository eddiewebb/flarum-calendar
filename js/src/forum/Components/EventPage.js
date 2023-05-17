import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import listItems from 'flarum/helpers/listItems';
import EventFragment from "./EventFragment";

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

    this.bodyClass = 'App--user';
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
        {this.event
          ?
            <div className="container">
              <div className="sideNavContainer">
                <nav className="IndexPage-nav sideNav" config={IndexPage.prototype.affixSidebar}>
                  <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                </nav>
                <div className="sideNavOffset IndexPage-results">
                  <h2>{this.event.name()}</h2>
                  <EventFragment event={this.event}/>
                </div>
              </div>
            </div>
          : [LoadingIndicator.component({ className: 'LoadingIndicator--block' })]}
      </div>
    );
  }

}
