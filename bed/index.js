const API = require('./game/api');
const conf = require('./conf/conf');

function Main(app, ipcMain){
	this.conf = conf.init(app);
	this.api = new API(ipcMain);
}

module.exports = Main;