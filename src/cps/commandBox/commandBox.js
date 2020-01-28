import React, { Component } from 'react';
// import gameConf from '../../conf/gameConf';
import event from '../../services/event';
// import lang from '../../i18n';

import './commandBox.scss';

// 
// ***************  Command Box  ***************
// 
// @args:
// 	{
// 		eventName: { String }
// 		heading: { String } - optional
// 		commands: { Object }
// 			[
// 				{
// 					label: { String },
// 					value: { String },
// 				}
// 			]
// 	}
// 
// *********************************************

class GameSelectBanner extends Component {

	// constructor(props){
	// 	super(props);
	// }

	_getLayout(){
		let layout = [];
		this.props.args.commands.forEach((command, idx) => {
			layout.push(<li key={ idx } className='command'>
				<button data-value={ command.value } className={`command-btn ${command.value}`}
					onClick={ this._clickCommand.bind(this, command) }>
					{ command.label }
				</button>
			</li>)
		});
		return layout;
	}

	_clickCommand(command){
		event.trigger(`${this.props.args.eventName}.click`, command);
		event.trigger(`${this.props.args.eventName}.${command.value}.click`, command);
	}

  render() {
		// let text = lang.content.gameSelectScene;
		let layout = this._getLayout();
		let heading = this.props.args.heading ? 
			<h3 className='heading'>{this.props.args.heading}</h3> : ''
    return (
      <div className={`cp cp-command-box ${this.props.args.eventName}`}>
      	{ heading }
      	<ul>
         	{ layout }
        </ul>
      </div>
    );
  }
}

export default GameSelectBanner;