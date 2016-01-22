var crypto = require('crypto');

module.exports = {
	avatar: function(email){
		if (!email) return '';

    	email = crypto.createHash('md5').update(email).digest('hex');
    
    	return 'http://www.gravatar.com/avatar/' + email + '?s=92';
	}
}