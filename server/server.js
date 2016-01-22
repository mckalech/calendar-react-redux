var express = require('express');
var login   = require('./login');



module.exports = {
	init: function(){
		express()
		    .set('view engine', 'jade')
		    .use(express.static('./public'))
		    .use(login.routes)
		    .use(require('./events'))
		    .get('*', login.required, function (req, res) {
		        res.render('index', {
		            user: login.safe(req.user)
		        });
		    })
		.listen(process.env.PORT || 3000);
	}
}