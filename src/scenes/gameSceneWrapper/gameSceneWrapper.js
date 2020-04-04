import React, { Component } from 'react';

import conf from '../../conf';
import { GameSelect, RoleSelect, MainMap } from '../';
import { event } from '../../services';
import { game, lang } from '../../gameEngine';


class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      scene: 0,
      lang: 'cn',
      data: {},
      playerKingdom: null
    }
  }

  _getScene(scene){

  	let layout = null;

  	switch (this.state.scene) {
  		case conf.scene.GAME_SELECT:
  			layout = <GameSelect />
  			break;
      case conf.scene.ROLE_SELECT:
        layout = <RoleSelect kingdoms = { this.state.data.kingdoms } lang = { this.state.lang } />
        break;
  		case conf.scene.MAIN_MAP:
  			layout = <MainMap />
  			break;
  		case conf.scene.BATTLE_MAP:
  			layout = <div id="battle-map-scene">this is battle map</div>
  			break;
  		case conf.scene.BATTLE:
  			layout = <div id="battle-scene">this is battle</div>
  			break;
  		case conf.scene.END:
  			layout = <div id="end-scene">this is the end</div>
  			break;
  		default:
  			break;
  	}

  	return layout;
  }

  _init(){
    game.init().then((gameData) => {
      this.setState({
        data: gameData.data
      })
    })
    lang.set('cn');
    // this._toScene(conf.scene.GAME_SELECT);
    this._toScene(conf.scene.ROLE_SELECT);
  }

  _toScene(id){
    this.setState({
      scene: parseInt(id)
    });
  }

  componentDidMount(){

    this._init();

    event.on('lang.change', (newLang) => {
      this.setState({
        lang: newLang
      });
    });

    event.on('scene.change', (newScene) => {
      this.setState({
        scene: newScene
      });
    });

    event.on('click.userLordSelected', (kingdom) => {
      this.setState({
        playerKingdom: kingdom,
        scene: conf.scene.MAIN_MAP
      });
    });
    
  }

  render() {
    if(!this.state.scene){
      return <div id='loading'>Loading...</div>
    }
  	let scene = this._getScene(this.state.scene);
    return (
      <div id="game-wrapper" className={ this.state.lang }>
      	{ scene }
      </div>
    );
  }
}

export default Game;