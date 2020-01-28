import React, { Component } from 'react';
import conf from '../../conf';
// import service from './service';
import './gameSelect.scss';

import { event } from '../../services';
import { lang } from '../../gameEngine';
import { GameSelectBanner, CommandBox } from '../../cps';

class GameSelect extends Component {

  constructor(props){
    super(props);
    this.state = {
      commandBox: 'main'
    }
  }

  _getCommandBox(){
    let text = lang.content.gameSelectScene;
    switch (this.state.commandBox) {
      case 'main':
        return {
          eventName: 'gameSelect',
          commands: [
            {
              label: text.NEW_GAME,
              value: 'newGame'
            },
            {
              label: text.LOAD_SAVED,
              value: 'loadGame'
            },
            {
              label: text.LANGUAGE_SWITCHER,
              value: 'languageSwitcher'
            },
          ]
        }
      case 'newGame':
        return {
          eventName: 'newGame',
          commands: [
            {
              label: text.EASY,
              value: 'level1'
            },
            {
              label: text.NORMAL,
              value: 'level2'
            },
            {
              label: text.HARD,
              value: 'level3'
            },
            {
              label: text.BACK,
              value: 'back'
            }
          ]
        }
      case 'loadGame':
        return {
          eventName: 'loadGame',
          commands: [
            {
              label: `${text.SAVE_SLOT} 1`,
              value: 'save1'
            },
            {
              label: `${text.SAVE_SLOT} 2`,
              value: 'save2'
            },
            {
              label: `${text.SAVE_SLOT} 3`,
              value: 'save3'
            },
            {
              label: `${text.SAVE_SLOT} 4`,
              value: 'save4'
            },
            {
              label: `${text.SAVE_SLOT} 5`,
              value: 'save5'
            },
            {
              label: `${text.SAVE_SLOT} 6`,
              value: 'save6'
            },
            {
              label: `${text.SAVE_SLOT} 7`,
              value: 'save7'
            },
            {
              label: `${text.SAVE_SLOT} 8`,
              value: 'save8'
            }
          ]
        }
       case 'languageSwitcher':
        return {
          eventName: 'languageSwitcher',
          commands: [
            {
              label: `${text.CN}`,
              value: 'cn'
            },
            {
              label: `${text.EN}`,
              value: 'en'
            }
          ]
        }
      default:
        return;
    }
  }

  componentDidMount(){
    
    event.on('gameSelect.newGame.click', (cmd) => {
      this.setState({
        commandBox: 'newGame'
      });
    });

    event.on('gameSelect.loadGame.click', (cmd) => {
      this.setState({
        commandBox: 'loadGame'
      });
    });

    event.on('gameSelect.languageSwitcher.click', (cmd) => {
      this.setState({
        commandBox: 'languageSwitcher'
      });
    });

    event.on('newGame.click', (cmd) => {

      event.trigger('scene.change', conf.scene.ROLE_SELECT)

      this.setState({
        commandBox: 'main'
      });
    });

    event.on('loadGame.click', (cmd) => {
      this.setState({
        commandBox: 'main'
      });
    });

    event.on('languageSwitcher.click', (cmd) => {
      if(cmd.value !== lang.get()){
        lang.set(cmd.value);
        event.trigger('lang.change', cmd.value)
      }
      this.setState({
        commandBox: 'main'
      });
    });
  }

  render() {
    let arg = this._getCommandBox();
    return (
      <div className='game-select scene'>
        <GameSelectBanner />
        <div className='game-select-box'>
          <div className='command-box'>
            <CommandBox args = { arg } />
          </div>
        </div>
      </div>
    );
  }
}

export default GameSelect;