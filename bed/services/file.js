const fs = require('fs');
const mkdirpSync = require('mkdirpsync');
const path = require('path');
const child_process = require('child_process');

/*

  Class File
  author: Garnet Xin (garnet.xin@anz.com)
  Define file data operation basic API

*/

function File(){  

}

File.prototype.isExist = function(dir){
	return fs.existsSync(dir);
}

File.prototype.isFolderExist = function(dirPath){
	return this.isExist(dirPath);
}

File.prototype.isFileExist = function(filePath){
	return this.isExist(filePath);
}

File.prototype.isValidFile = function(fileName){
	return fileName && fileName.indexOf('.') > 0;
}

File.prototype.isJSON = function(fileName = ''){
	return fileName.indexOf('.json') > 0;
}

File.prototype.createFolder = function(dirPath){
	if(dirPath && !this.isFolderExist(dirPath)){
		try{
			mkdirpSync(dirPath);
		}catch(exception){
			console.log(exception);
		}
	}
	return this;
}

File.prototype.getAllFilesFromDir = function(dir) {
	let files = [];
	if(this.isFolderExist(dir)){
		files = fs.readdirSync(dir);
	}
	return files;
}

File.prototype.copy = function(sourceDir, targetDir){
	try{
  	child_process.execSync(`cp ${sourceDir} ${targetDir}`)
	}catch(err){
		console.log(err);
	}
}

File.prototype.save = function(fileName, fileDir, value = ''){
	try{
		if(fileName && fileDir && this.isValidFile(fileName)){
			if(!this.isFolderExist(fileDir)){
				this.createFolder(fileDir)
			}

			if(this.isJSON(fileName)){
				value = JSON.stringify(value);
			}

			fs.writeFileSync(path.resolve(fileDir, `./${fileName}`), value, {
	      flag: 'w', 
	      code: 'utf-8'
	    })
		}else{
			throw new Error('missing param for file.save method');
		}
	}catch(exception){
		console.log(exception);
	}
	return value;
}

File.prototype.load = function(fileName, fileDir){
	let result = '';
	try{
		let filePath = path.resolve(fileDir, `./${fileName}`)
		if( this.isFileExist(filePath) ){
			result = fs.readFileSync(filePath, 'utf-8');
			if(this.isJSON(fileName)){
				result = JSON.parse(result)
			}
		}
	}catch(exception){
		console.log(exception);
	}
	return result;
}

module.exports = File;