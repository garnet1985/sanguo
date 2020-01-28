class City {
	constructor(entity){
		for(const key in entity){
			this[key] = entity[key];
		}
	}
	build(){

	}
	getPopulation(){
		let factor = Math.pow(
			+ this.entity.industry * .1 
			+ this.entity.infrastructure * .3
			+ this.entity.morale * 10 * .3, 
		.57);
		return Math.round(factor) * 10000;
	}
	countMilitary(){

	}
}

export default City;