import Entity from './entity';
import conf from '../../conf';

class City extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
	build(){

	}
	getPopulation(){

	}
	countMilitary(){

	}
}

export default new City(conf.fileName.city);

// function City(initData){
// 	this.id 						= initData.id;
// 	this.name 					= initData.name;
// 	this.morale 				= initData.morale;
// 	this.treasure 			= initData.treasure;
// 	this.generals 			= initData.generals;
// 	this.leader 				= initData.leader;
// 	this.development 		= {
// 		farmland: initData.farmland,
// 		industry: initData.industry,
// 		infrastructure: initData.infrastructure
// 	};
// 	this.military 			= initData.military;
// 	this.militaryAmount = this.countMilitary();
// 	this.disasterPrevention = initData.disasterPrevention;
// 	this.immigration = 0;
// }

// City.prototype.build = function(generals = []){
// 	let results = [];
// 	if(this.generals.length){
// 		generals.forEach((gen) => {
// 			this.generals.forEach((id) => {
// 				if(gen.id === id) {
// 					results.push(gen);
// 				}
// 			});
// 			if(this.leader === gen.id){
// 				this.leader = gen;
// 			}
// 		});
// 		this.generals = results;
// 	}
// 	this.getPopulation();
// }

// City.prototype.getPopulation = function(){
// 	let factor = Math.pow(this.development.farmland * .4 
// 		+ this.development.industry * .1 
// 		+ this.development.infrastructure * .5, .57) * 10;
// 	this.population = (Math.round(factor) + this.immigration) * 1000;
// }

// City.prototype.countMilitary = function(){
// 	return 10000;
// }