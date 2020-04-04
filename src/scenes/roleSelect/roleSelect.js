import React, { Component } from 'react';
import { event } from '../../services';

import './roleSelect.scss';

class RoleSelect extends Component {

  _selectLord(kingdom){
    event.trigger('click.userLordSelected', kingdom);
  }

  _getCharactors(){
    let layout = [];
    if(this.props.kingdoms){
      console.log(this.props.kingdoms)
      this.props.kingdoms.forEach( (kingdom, idx) => {
        const style = {
          backgroundColor: kingdom.color
        }
        layout.push(<div key = { `role-select-${idx}` }>
          <button id={kingdom.id} onClick={this._selectLord.bind(this, kingdom)}>
            <span className='flag' style={style}>{ kingdom.name[this.props.lang] }</span>
            <span className='captial'>{ kingdom.capital.name[this.props.lang] }</span>
            <span className='scale'>{ kingdom.cities.length }</span>
          </button>
        </div>)
      })
    }
    return layout;
  }

  render() {
    let availableRoles = this._getCharactors();
    return (
      <div className="role-select scene">
        { availableRoles }
      </div>
    );
  }
}

export default RoleSelect;