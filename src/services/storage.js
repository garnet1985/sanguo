function Storage(){
	this.ipcRenderer = window.require('electron').ipcRenderer;
}

Storage.prototype.save = function(fileName, data){
	return this.do('save', fileName, {
		data
	});
}

Storage.prototype.load = function(fileName){
	return this.do('load', fileName);
}

Storage.prototype.loadSysDb = function(fileName){
	return this.do('load', fileName, {
		db: 'sys'
	});
}

Storage.prototype.do = function(eventType, fileName = '', opts = {}){
	return new Promise((resolve, reject) => {
		this.ipcRenderer.once(`${fileName}.${eventType}.complete`, (e, data) => {
			resolve(data);
		});
		this.ipcRenderer.send(eventType, {
			fileName,
			opts
		});
	});
}

export default new Storage();