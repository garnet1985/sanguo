const fs = require('fs');
const path = require('path');

function Conf(){
	const rootDir = path.resolve(__dirname, '../../');
	const packageJson = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json'), 'utf-8'));
	this.appName = packageJson.name;
	this.version = packageJson.version;
	this.appRoot = path.resolve(rootDir, './bed/gameData');
	this.docRoot = '';
	this.dbName = {
		app: 'db',
		doc: 'db',
		saveGame: 'saveGame',
		customized: 'customized'
	}
}

Conf.prototype.init = function(app){
	this.docRoot = path.resolve(app.getPath('documents'), `./${this.appName}`);
}

Conf.prototype.get = function(key){
	return this[key];
}

Conf.prototype.set = function(key, value){
	this[key] = value;
}

module.exports = new Conf();