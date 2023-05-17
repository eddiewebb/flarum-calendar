import Component from 'flarum/common/Component';
import Link from 'flarum/common/components/Link';
import UserCard from './UserCard';
import avatar from '../../common/helpers/avatar';
import username from '../../common/helpers/username';
import userOnline from '../../common/helpers/userOnline';
import listItems from '../../common/helpers/listItems';
import Component  from 'flarum/common/Component';
/**
 * The `PostUser` component shows the avatar and username of a post's author.
 *
 * ### Props
 *
 * - `post`
 */
export default class EventUser extends Component {
  init() {
    /**
     * Whether or not the user hover card is visible.
     *
     * @type {Boolean}
     */
    this.cardVisible = false;
  }

  view() {
    const post = this.attrs.post;
    const user = this.attrs.user;

    if (!user) {
      return (
        <div className="PostUser">
          <h3>
            {avatar(user, { className: 'PostUser-avatar' })} {username(user)}
          </h3>
        </div>
      );
    }

    let card = '';

    if (!post.isHidden() && this.cardVisible) {
      card = UserCard.component({
        user,
        className: 'UserCard--popover',
        controlsButtonClassName: 'Button Button--icon Button--flat',
      });
    }

    return (
      <div className="PostUser">
        <h3>
          <Link href={app.route.user(user)}>
            {avatar(user, { className: 'PostUser-avatar' })}
            {userOnline(user)}
            {username(user)}
          </Link>
        </h3>
        <ul className="PostUser-badges badges">{listItems(user.badges().toArray())}</ul>
        {card}
      </div>
    );
  }

  config(isInitialized) {
    if (isInitialized) return;

    let timeout;

    this.$()
      .on('mouseover', 'h3 a, .UserCard', () => {
        clearTimeout(timeout);
        timeout = setTimeout(this.showCard.bind(this), 500);
      })
      .on('mouseout', 'h3 a, .UserCard', () => {
        clearTimeout(timeout);
        timeout = setTimeout(this.hideCard.bind(this), 250);
      });
  }

  /**
   * Show the user card.
   */
  showCard() {
    this.cardVisible = true;

    m.redraw();

    setTimeout(() => this.$('.UserCard').addClass('in'));
  }

  /**
   * Hide the user card.
   */
  hideCard() {
    this.$('.UserCard')
      .removeClass('in')
      .one('transitionend webkitTransitionEnd oTransitionEnd', () => {
        this.cardVisible = false;
        m.redraw();
      });
  }
}
