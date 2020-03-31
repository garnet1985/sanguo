import { storage } from '../../services';
import conf from '../../conf';
class Entity {
	constructor(){
    this.requiredInitEntity = conf.entityFiles;
    this.instances = {};
	}
  init(){
    return this.load().then((data) => {
      this.createInstances(data).build();
      return this.instances;
    });
  }
  createInstances(loadedData) {
    loadedData.forEach((d, idx) => {
      this.instances[this.requiredInitEntity[idx].name] = this.createInstance(d, this.requiredInitEntity[idx].class);
    });
    return this;
  }
  createInstance(entities, Cls){
    return entities.map((entity) => {
      return new Cls(entity);
    });
  }
  build(){
    // order is important!
    this.buildWeapons().buildGenerals().buildCities().buildKingdoms();
    return this;
  }
  load(type){
    let promises = [];
    this.requiredInitEntity.forEach( entity => {
      promises.push(storage.load(entity.fileName));
    });
    return Promise.all(promises);
  }
  buildWeapons (){
    for(let weapon of this.instances.weapons){
      for(let weaponType of this.instances.weaponTypes){
        if(weapon.category === weaponType.id){
          weapon.category = weaponType;
        }
      }
    }
    return this;
  }
  buildGenerals (){
    for(let general of this.instances.generals){
      for(let weapon of this.instances.weapons){
        if(general.weapon === weapon.id){
          general.weapon = weapon;
        }
      }
      for(let armor of this.instances.armors){
        if(general.armor === armor.id){
          general.armor = armor;
        }
      }
    }
    return this;
  }
  buildCities (){
    for(let general of this.instances.generals){
      for(let city of this.instances.cities){
        if(city.leader === general.id){
          city.leader = general;
        }
        for(let [idx, generalId] of city.generals.entries()){
          if(generalId === general.id){
            city.generals[idx] = general;
          }
        }
      }
    }
    return this;
  }
  buildKingdoms (){
    for(let city of this.instances.cities){
      for(let kingdom of this.instances.kingdoms){
        if(kingdom.capital === city.id){
          kingdom.capital = city;
        }
        for(let [idx, cityId] of kingdom.cities.entries()){
          if(cityId === city.id){
            kingdom.cities[idx] = city;
          }
        }
      }
    }
    return this;
  }
}

export default new Entity();