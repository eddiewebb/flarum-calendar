import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import affixSidebar from 'flarum/utils/affixSidebar';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import listItems from 'flarum/helpers/listItems';
import Event from "../Models/Event";
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

    //loadEvent(  m.route.param('id'));
    app.preloadedApiDocument();
    app.store.all('events').some((event) => {
      if (event.data.id === m.route.param('id')) {
	//show(event)
        this.event = event; 
        this.user = event.user(); 
        app.current.set('event', event); 
        app.setTitle(event.name()); 
	return true;
      }
    });
    if (!this.event) {
      app.store.find('events', eventId).then(this.show.bind(this));
    }

    this.bodyClass = 'App--user';
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
