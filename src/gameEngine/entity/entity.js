import { storage } from '../../services';

class Entity {
	constructor(fileName, primaryKey){
		this.entityCache = [];
		this.fileName = fileName;
		this.primaryKey = primaryKey;
	}
	load() {
    return storage.load(this.fileName).then( entities => {
      this.entityCache = entities;
      return this.entityCache;
    })
  }
  save(entities) {
    entities = entities || this.entities;
    return storage.save(this.fileName, entities).then( results => {
      this.entityCache = results;
      return this.entityCache;
    });
  }
}

export default Entity;