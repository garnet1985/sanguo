const Storage = require('./storage');

function API(ipcMain){
	this.ipcMain = ipcMain;
	this.storage = new Storage();
	this.storage.copyToDoc();
	this.initListeners()
}

API.prototype.initListeners = function(){
	this.ipcMain.on('load', (e, args) => {
	  e.sender.send(`${args.fileName}.load.complete`, this.storage.load(args.fileName, args.opts));
	});
	this.ipcMain.on('save', (e, args) => {
	  e.sender.send(`${args.fileName}.save.complete`, this.storage.save(args.fileName, args.opts));
	});
	return this;
}

module.exports = API;