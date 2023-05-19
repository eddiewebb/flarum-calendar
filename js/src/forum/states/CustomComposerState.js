import ComposerState from 'flarum/forum/states/ComposerState';

export default class CustomComposerState extends ComposerState {
  constructor() {
    super();

    /**
     * The composer's current position.
     *
     * @type {ComposerState.Position}
     */
    this.position = ComposerState.Position.NORMAL;
  }
}
