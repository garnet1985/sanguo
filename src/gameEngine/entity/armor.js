import Entity from './entity';
import conf from '../../conf';

class Armor extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
}

export default new Armor(conf.fileName.armor);