import en from './en';
import cn from './cn';

export default {
	currentLanguage: 'cn',
	content: cn,
	set: function(lang){
		switch (lang.toLowerCase()) {
			case 'en':
				this.currentLanguage = 'en';
				this.content = en;
				break;
			case 'cn':
				this.currentLanguage = 'cn';
				this.content = cn;
				break;
			default:
				throw new Error('unrecognized language code in Language Class');
		}
	},
	get: function(){
		return this.currentLanguage;
	}
};