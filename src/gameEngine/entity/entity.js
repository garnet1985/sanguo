import { storage } from '../../services';
import conf from '../../conf';

import Kingdom from './kingdom';
import General from './general';
import City from './city';
import Weapon from './weapon';
import WeaponType from './weaponType';
import Armor from './armor';

class Entity {
	constructor(){
    this.kingdoms = [];
    this.generals = [];
    this.cities = [];
    this.weapons = [];
    this.weaponTypes = [];
    this.armors = [];
	}
  init(){
    return this.load().then(() => {
      return this.build();
    });
  }
  createInstance(entityName, Cls){
    let results = [];
    this[entityName].forEach((entity) => {
      const ins = new Cls(entity);
      results.push(ins);
    });
    return results;
  }
  build(){
    const instances = {
      kingdoms: this.createInstance('kingdoms', Kingdom),
      generals: this.createInstance('generals', General),
      cities: this.createInstance('cities', City),
      weapons: this.createInstance('weapons', Weapon),
      weaponTypes: this.createInstance('weaponTypes', WeaponType),
      armors: this.createInstance('armors', Armor)
    }
    const weapons = this.buildWeapons(instances.weapons, instances.weaponTypes);
    const generals = this.buildGenerals(instances.generals, instances.armors, weapons);
    const cities = this.buildCities(instances.cities, generals);
    return this.buildKingdoms(instances.kingdoms, cities);
  }
  load(){
    return Promise.all([
      storage.load(conf.fileName.kingdom),
      storage.load(conf.fileName.general),
      storage.load(conf.fileName.city),
      storage.load(conf.fileName.weapon),
      storage.load(conf.fileName.weaponType),
      storage.load(conf.fileName.armor)
    ]).then((promises) => {
      this.kingdoms = promises[0];
      this.generals = promises[1];
      this.cities = promises[2];
      this.weapons = promises[3];
      this.weaponTypes = promises[4];
      this.armors = promises[5];
    });
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
 //  save(entities) {
 //    entities = entities || this.entities;
 //    return storage.save(this.fileName, entities).then( results => {
 //      this.entityCache = results;
 //      return this.entityCache;
 //    });
 //  }
}

export default new Entity();