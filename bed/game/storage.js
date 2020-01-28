const path = require('path');
const conf = require('../conf/conf');
const File = require('../services/file');

function Storage(){
  this.file = new File();
  this.sysDbPath = path.resolve(conf.appRoot, conf.dbName.app);
  this.docDbPath = path.resolve(conf.docRoot, conf.dbName.doc);
}

Storage.prototype.load = function(fileName, opts = {}){
	let dir = '';
	switch (opts.db) {
		case 'sys':
			dir = this.sysDbPath;
			break;
		default:
			dir = this.docDbPath;
			break;
	}
	return this.file.load(fileName, dir)
}

Storage.prototype.save = function(fileName, data, opts = {}){
	return this.file.save(fileName, this.docDbPath, data);
}

Storage.prototype.copyToDoc = function(){
	if(!this.file.isFolderExist(conf.docRoot)){
		this.file.createFolder(this.docDbPath);
		const files = this.file.getAllFilesFromDir(this.sysDbPath) || [];
		files.forEach( fileName => {
			const sourceDir = path.resolve(this.sysDbPath, fileName);
			const targetDir = path.resolve(this.docDbPath, fileName);
			this.file.copy(sourceDir, targetDir);
		})
	}
}

module.exports = Storage;
