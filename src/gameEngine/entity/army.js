import Entity from './entity';
import conf from '../../conf';

class Army extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
}

export default new Army(conf.fileName.army);