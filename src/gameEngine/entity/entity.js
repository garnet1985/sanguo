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
    this.instances = {};
	}
  init(){
    return this.load().then((data) => {
      const gameData = this.build(data);
      return gameData;
    });
  }
  createInstance(entities, Cls){
    return entities.map((entity) => {
      return new Cls(entity);
    });
  }
  build(data){
    this.instances = {
      kingdoms: this.createInstance(data.kingdoms, Kingdom),
      generals: this.createInstance(data.generals, General),
      cities: this.createInstance(data.cities, City),
      weapons: this.createInstance(data.weapons, Weapon),
      weaponTypes: this.createInstance(data.weaponTypes, WeaponType),
      armors: this.createInstance(data.armors, Armor)
    }
    const weapons = this.buildWeapons(this.instances.weapons, this.instances.weaponTypes);
    const generals = this.buildGenerals(this.instances.generals, this.instances.armors, weapons);
    const cities = this.buildCities(this.instances.cities, generals);
    const kingdoms = this.buildKingdoms(this.instances.kingdoms, cities);
    return kingdoms;
  }
  load(type){
    return Promise.all([
      storage.load(conf.fileName.kingdom),
      storage.load(conf.fileName.general),
      storage.load(conf.fileName.city),
      storage.load(conf.fileName.weapon),
      storage.load(conf.fileName.weaponType),
      storage.load(conf.fileName.armor)
    ]).then((promises) => {
      return {
        kingdoms: promises[0],
        generals: promises[1],
        cities: promises[2],
        weapons: promises[3],
        weaponTypes: promises[4],
        armors: promises[5]
      }
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
}

export default new Entity();