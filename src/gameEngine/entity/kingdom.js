import Entity from './entity';
import conf from '../../conf';

class Kingdom extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
	build(){

	}
}

export default new Kingdom(conf.fileName.kingdom);

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