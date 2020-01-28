const path = require('path');
const conf = require('../conf/conf');
const File = require('../services/file');

function Storage(){
  this.file = new File();
  this.appRoot = conf.appRoot;
  this.docRoot = conf.docRoot;
  this.sysDbPath = path.resolve(conf.appRoot, conf.dbName.app);
  this.docDbPath = path.resolve(conf.docRoot, conf.dbName.doc);
  this.docSavePath = path.resolve(conf.docRoot, conf.dbName.saveGame);
}

Storage.prototype.getDir = function(dbPath){
	let dir = '';
	switch (dbPath) {
		case 'sys':
			dir = this.sysDbPath;
			break;
		case 'saveGame':
			dir = this.docSavePath;
			break;
		default:
			dir = this.docDbPath;
			break;
	}
	return dir;
}

Storage.prototype.load = function(fileName, opts = {}){
	const dir = this.getDir(opts.db);
	return this.file.load(fileName, dir)
}

Storage.prototype.save = function(fileName, opts = {}){
	const dir = this.getDir(opts.db);
	return this.file.save(fileName, dir, opts.data);
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
