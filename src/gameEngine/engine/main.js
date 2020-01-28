import { kingdom, general, city, weapon, weaponType, armor } from '../entity/';

function Game(){

}

Game.prototype.init = function(){
	this.loadEntities()
	// .then( data => {
		// console.log(data)
		// this.getEntityInstances();
		// this.build();
	// });
}

Game.prototype.loadEntities = function(){

	// if(gameCache.load()).then(cache => {
		
	// })

	// return Promise.all([
	// 	kingdom.load(),
	// 	general.load(),
	// 	city.load(),
	// 	weapon.load(),
	// 	weaponType.load(),
	// 	armor.load()
	// ])
}

Game.prototype.buildCache = function(){
	// return Promise.all([
	// 	api.getKingdoms(),
	// 	api.getGenerals(),
	// 	api.getCities(),
	// 	api.getWeapons(),
	// 	api.getArmors(),
	// 	api.getWeaponTypes()
	// ]).then((promises) => {
	// 	this.kingdoms = promises[0];
	// 	this.generals = promises[1];
	// 	this.cities = promises[2];
	// 	this.weapons = promises[3];
	// 	this.armors = promises[4];
	// 	this.weaponTypes = promises[5];
	// })
}

Game.prototype.getEntityInstances = function(){

	// this.kingdoms.forEach((kingdom, idx) => {
	// 	this.kingdoms[idx] = new Kingdom(kingdom);
	// });

	// this.generals.forEach((general, idx) => {
	// 	this.generals[idx] = new General(general);
	// });

	// this.cities.forEach((city, idx) => {
	// 	this.cities[idx] = new City(city);
	// });

	// this.weapons.forEach((weapon, idx) => {
	// 	this.weapons[idx] = new Weapon(weapon);
	// });

	// this.weaponTypes.forEach((weaponType, idx) => {
	// 	this.weaponTypes[idx] = new WeaponType(weaponType);
	// });

	// this.armors.forEach((armor, idx) => {
	// 	this.armors[idx] = new Armor(armor);
	// });
}

Game.prototype.build = function(){
	// this.weapons.forEach((weapon) => {
	// 	weapon.build(this.weaponTypes);
	// });

	// this.generals.forEach((general) => {
	// 	general.build(this.weapons, this.armors);
	// });

	// this.cities.forEach((city) => {
	// 	city.build(this.generals);
	// });

	// this.kingdoms.forEach((kingdom) => {
	// 	kingdom.build(this.cities);
	// });

	// console.log(this.kingdoms);
}




export default new Game();