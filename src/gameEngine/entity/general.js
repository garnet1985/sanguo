import levelSys from '../engine/levelSys';

class General {
	constructor(entity){
		for(const key in entity){
			this[key] = entity[key];
		}
		this.ability = {};
		this.init();
	}
	init(){
		this.getAbilityDisplayValue();
	}
	getAbilityDisplayValue(){
		for(let key in this){
			switch(key){
				case 'charm':
				case 'politics':
				case 'command':
				case 'intelligence':
				case 'power':
				case 'hp':
					this['ability'][key] = levelSys.getLevel(this[key]);
					break;
				default:
					break;
			}
		}
		return this;
	}
}

export default General;

// function General(initData){
// 	this.id 					= initData.id;
// 	this.name 				= initData.name;
// 	this.experience 	= initData.experience;
// 	this.level				= this.getLevel(initData.experience);
// 	// 德
// 	this.charm 		= initData.charm;
// 	// 体
// 	this.hp 					= initData.hp;
// 	// 政
// 	this.politics 		= initData.politics;
// 	// 统
// 	this.command 			= initData.command;
// 	// 智
// 	this.intelligence = initData.intelligence;
// 	// 武
// 	this.force = {
// 		power: initData.power,
// 		skill: initData.skill,
// 		overall: this.getOverallForce(initData.power, initData.skill)
// 	}
// 	// 忠
// 	this.loyalty = {
// 		extent: initData.extent,
// 		caprice: initData.caprice
// 	}
// 	this.bornYear 		= initData.bornYear;
// 	this.deadYear 		= initData.deadYear;
// 	this.title 				= initData.title;
// 	this.heroType			= initData.heroType;
// 	this.weapon				= initData.weapon;
// 	this.armor				= initData.armor;
// 	this.isCustomized = initData.isCustomized;
// 	this.isLord 			= initData.isLord;
// 	this.ambition 		= initData.ambition;
// 	this.aggressive 	= initData.aggressive;
// }

// General.prototype.build = function(weapons, armors){
// 	weapons.forEach((weapon) => {
// 		if(weapon.id === this.weapon){
// 			this.weapon = weapon;
// 			return;
// 		}
// 	});
// 	armors.forEach((armor) => {
// 		if(armor.id === this.armor){
// 			this.armor = armor;
// 			return;
// 		}
// 	});
// 	this.getMaxAllowedMilitary();
// }

// General.prototype.getMaxAllowedMilitary = function(){
// 	this.maxMilitary = Math.round(this.command / 10 + 1) * 1000;
// }

// General.prototype.getOverallForce = function(power, skill){
// 	return Math.round(power * .43 + skill * .57);
// }

// General.prototype.getLevel = function(exp){
// 	return parseInt(exp / 100) + 1;
// }