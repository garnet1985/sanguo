class LevelSys {
	getLevel(number){
		number = Number(number);
		if(number === 20){
			return 'SR';
		}
		if(number > 17){
			return 'S';
		}
		if(number > 15){
			return 'A';
		}
		if(number > 10){
			return 'B';
		}
		if(number > 6){
			return 'C';
		}
		return 'D';
	}
}

export default new LevelSys();