import Kingdom from '../gameEngine/entity/kingdom';
import General from '../gameEngine/entity/general';
import City from '../gameEngine/entity/city';
import Weapon from '../gameEngine/entity/weapon';
import WeaponType from '../gameEngine/entity/weaponType';
import Armor from '../gameEngine/entity/armor';

export default {
	version: 0.01,
	scene: {
		GAME_SELECT: 1,
		ROLE_SELECT: 2,
		MAIN_MAP: 3,
		BATTLE_MAP: 4,
		BATTLE: 5,
		END: 6
	},
	entityFiles: [
		{
			fileName: 'armors.json',
			class: Armor,
			name: 'armors'
		},
		{
			fileName: 'cities.json',
			class: City,
			name: 'cities'
		},
		{
			fileName: 'generals.json',
			class: General,
			name: 'generals'
		},
		{
			fileName: 'kingdoms.json',
			class: Kingdom,
			name: 'kingdoms'
		},
		{
			fileName: 'weapons.json',
			class: Weapon,
			name: 'weapons'
		},
		{
			fileName: 'weaponTypes.json',
			class: WeaponType,
			name: 'weaponTypes'
		}
	]
}