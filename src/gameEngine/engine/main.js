import { entity } from '../entity';
// import service from './main.service';

function Game(){
	this.gameDataCache = {};
}

Game.prototype.init = function(){
	return entity.init().then((data) => {
		this.gameDataCache.data = data;
		return this.gameDataCache;
	});
}

export default new Game();