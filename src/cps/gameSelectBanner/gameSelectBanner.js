import React, { Component } from 'react';
import conf from '../../conf';
import { lang } from '../../gameEngine';

import './gameSelectBanner.scss';

class GameSelectBanner extends Component {
  render() {
		let text = lang.content.gameSelectScene;
    return (
      <div className='cp cp-game-select-banner'>
         <h1 className='primary-text'>{ text.GAME_TITLE }</h1>
         <span className='game-version'>{ text.GAME_VERSION } { conf.version }</span>
      </div>
    );
  }
}

export default GameSelectBanner;