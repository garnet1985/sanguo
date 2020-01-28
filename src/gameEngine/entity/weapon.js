import Entity from './entity';
import conf from '../../conf';

class Weapon extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
	build(){

	}
}
export default new Weapon(conf.fileName.weapon);

// function Weapon(initData){
// 	this.id = initData.id;
// 	this.name = initData.name;
// 	this.startPoint = initData.startPoint;
// 	this.power = initData.power;
// 	this.category = initData.category;
// }

// Weapon.prototype.build = function(weaponTypes){
// 	weaponTypes.forEach((type) => {
// 		if(type.id === this.category){
// 			this.category = type;
// 		}
// 	})
// }