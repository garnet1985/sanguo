import { storage } from '../../services';
import conf from '../../conf';
class Entity {
	constructor(){
    this.requiredInitEntity = conf.entityFiles;
    this.instances = {};
	}
  init(){
    return this.load().then((data) => {
      const gameData = this.createInstances(data).build();
      return gameData;
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
    const weapons = this.buildWeapons(this.instances.weapons, this.instances.weaponTypes);
    const generals = this.buildGenerals(this.instances.generals, this.instances.armors, weapons);
    const cities = this.buildCities(this.instances.cities, generals);
    const kingdoms = this.buildKingdoms(this.instances.kingdoms, cities);
    return kingdoms;
  }
  load(type){
    let promises = [];
    this.requiredInitEntity.forEach( entity => {
      promises.push(storage.load(entity.fileName));
    });
    return Promise.all(promises);
  }
  buildWeapons (weapons, weaponTypes){
    for(let weapon of weapons){
      for(let weaponType of weaponTypes){
        if(weapon.category === weaponType.id){
          weapon.category = weaponType;
        }
      }
    }
    return weapons;
  }
  buildGenerals (generals, armors, weapons){
    for(let general of generals){
      for(let weapon of weapons){
        if(general.weapon === weapon.id){
          general.weapon = weapon;
        }
      }
      for(let armor of armors){
        if(general.armor === armor.id){
          general.armor = armor;
        }
      }
    }
    return generals;
  }
  buildCities (cities, generals){
    for(let general of generals){
      for(let city of cities){
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
    return cities;
  }
  buildKingdoms (kingdoms, cities){
    for(let city of cities){
      for(let kingdom of kingdoms){
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
    return kingdoms;
  }
}

export default new Entity();