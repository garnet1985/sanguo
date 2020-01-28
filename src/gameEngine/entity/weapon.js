class Weapon {
	constructor(entity){
		for(const key in entity){
			this[key] = entity[key];
		}
	}
	build(){

	}
}
export default Weapon;

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