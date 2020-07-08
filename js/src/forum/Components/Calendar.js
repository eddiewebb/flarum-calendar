import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Component  from 'flarum/Component';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import SelectDropdown from 'flarum/components/SelectDropdown';
import LinkButton from 'flarum/components/LinkButton';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

export default class CalendarComponent extends Page {
    init() {
        super.init();
        document.addEventListener('DOMContentLoaded', function() {
          var calendarEl = document.getElementById('calendar');

          var calendar = new Calendar(calendarEl, {
            plugins: [ dayGridPlugin ]
          });

          calendar.render();
        });
	}

    onunload() {
    }

    view() {
        return (
        	<div className="IndexPage">
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(this.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="IndexPage-results sideNavOffset">
                            <div className="IndexPage-toolbar">
                            </div>
                            <div id="calendar">here</div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }

        /**
     * Build an item list for the sidebar of the index page. By default this is a
     * "New Discussion" button, and then a DropdownSelect component containing a
     * list of navigation items.
     *
     * @return {ItemList}
     */
    sidebarItems() {
        const items = IndexPage.prototype.sidebarItems();

        items.replace('nav',
            SelectDropdown.component({
                children: this.navItems(this).toArray(),
                buttonClassName: 'Button',
                className: 'App-titleControl'
            })
        );

        return items;
    }  

    /**
     * Build an item list for the navigation in the sidebar of the index page. By
     * default this is just the 'All Discussions' link.
     *
     * @return {ItemList}
     */
    navItems() {
        const items = IndexPage.prototype.navItems();

        items.add('fof-user-directory',
            LinkButton.component({
                href: app.route('advcalendar'),
                children: app.translator.trans('fof-user-directory.forum.page.nav'),
                icon: 'far fa-address-book'
            }),
            85
        );

        return items;
    }
  /**
     * Build an item list for the part of the toolbar which is concerned with how
     * the results are displayed. By default this is just a select box to change
     * the way discussions are sorted.
     *
     * @return {ItemList}
     */
    viewItems() {

    }

    config(isInitialized, context) {
    }
}
