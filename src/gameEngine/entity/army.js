class Army {
	constructor(entity){
		for(const key in entity){
			this[key] = entity[key];
		}
	}
	build(){
		
	}
}

export default Army;