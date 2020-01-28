class Kingdom {
	constructor(entity){
		for(const key in entity){
			this[key] = entity[key];
		}
	}
	build(){

	}
}

export default Kingdom;

// function Kingdom(initData){
// 	this.id 						= initData.id;
// 	this.name						= initData.name;
// 	this.isCustomized		= initData.isCustomized;
// 	this.capital				= initData.capital;
// 	this.reputation			= initData.reputation;
// }

// Kingdom.prototype.build = function(cities = []){
// 	cities.forEach((city) => {
// 		if(city.id === this.capital){
// 			this.capital = city;
// 			return;
// 		}
// 	})
// }