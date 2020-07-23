import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import ItemList from 'flarum/utils/ItemList';
import affixSidebar from 'flarum/utils/affixSidebar';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import SelectDropdown from 'flarum/components/SelectDropdown';
import LinkButton from 'flarum/components/LinkButton';
import Separator from 'flarum/components/Separator';
import listItems from 'flarum/helpers/listItems';
import Event from "../Models/Event";
import EventTeaser from "./EventTeaser";
import EventFragment from "./EventFragment";

/**
 * The `EventPage` component shows a individual event details
 *
 * @abstract
 */
export default class EventPage extends Page {
  init() {
    super.init();

    /**
     * The user this page is for.
     *
     * @type {Event}
     */
    this.event = null;
    this.loadEvent(  m.route.param('id'));
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
                <div className="sideNavOffset IndexPage-results"><EventFragment event={this.event}/></div>
              </div>
              <script type="application/ld+json">
                {
                  "{\n" +
                  "  \"@context\": \"http://schema.org/\",\n" +
                  "  \"@type\": \"Event\",\n" +
                  "  \"name\": \""  + this.event.name() +  "\",\n" +
                  "      \"location\": {\n" +
                  "        \"@type\": \"VirtualLocation\",\n" +
                  "        \"url\": \"https://adkadv.com/\"\n" +
                  "        },\n" +
                  "  \"startDate\": \""  + this.event.event_start() +  "\",\n" +
                  "  \"endDate\": \""  + this.event.event_end() +  "\"\n" +
                  "}\n"
                }
              </script>
            </div>

          : [LoadingIndicator.component({ className: 'LoadingIndicator--block' })]}
      </div>
    );
  }

  /**
   * Get the content to display in the user page.
   *
   * @return {VirtualElement}
   */
  content() {}

  /**
   * Initialize the component with a user, and trigger the loading of their
   * activity feed.
   *
   * @param {Event} event
   * @protected
   */
  show(event) {
    this.event = event;
    this.user = event.user();

    //app.current.set('event', event);

    app.setTitle( event.name() + " | ADK Adventure Riders");

    m.redraw();
  }

  /**
   * Given a username, load the user's profile from the store, or make a request
   * if we don't have it yet. Then initialize the profile page with that user.
   *
   * @param {Integer} eventId
   */
  loadEvent(eventId) {

    // Load the preloaded user object, if any, into the global app store
    // We don't use the output of the method because it returns raw JSON
    // instead of the parsed models
    app.preloadedApiDocument();

    app.store.all('events').some((event) => {
      if (event.data.id === eventId) {
        this.show(event);
        return true;
      }
    });

    if (!this.event) {
      app.store.find('events', eventId).then(this.show.bind(this));
    }
  }

  /**
   * Build an item list for the content of the sidebar.
   *
   * @return {ItemList}
   */
  sidebarItems() {
    const items =  new ItemList();
    items.add(
      'nav',
      SelectDropdown.component({
        children: this.navItems().toArray(),
        className: 'App-titleControl',
        buttonClassName: 'Button',
      })
    );

    return items;
  }

  /**
   * Build an item list for the navigation in the sidebar.
   *
   * @return {ItemList}
   */
  navItems() {
    const items = new ItemList();
    const user = this.user;

    return items;
  }
}
