import Entity from './entity';
import conf from '../../conf';

class WeaponType extends Entity {
	constructor(fileName){
		super(fileName, 'id')
	}
	build(){

	}
}
export default new WeaponType(conf.fileName.weaponType);