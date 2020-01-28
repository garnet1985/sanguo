import { entity } from '../entity';
// import service from './main.service';

function Game(){
	this.gameDataCache = {};
}

Game.prototype.init = function(){
	entity.init().then((data) => {
		this.gameDataCache.data = data;
	});
}

export default new Game();