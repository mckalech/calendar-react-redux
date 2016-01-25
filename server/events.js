var router = module.exports = require('express').Router();
var login  = require('./login');

var db = new (require('locallydb'))('./data');
var events = db.collection('events');

router.route('/api/events')
    .all(login.required)
    .get(function (req, res) {
		var e = events.toArray();
		e = e.filter(function(evnt){
			return evnt.userId === req.user.cid;
		});
        res.json(e);
    })
    .post(function (req, res) {
        var event = req.body;
        event.userId = req.user.cid;
        var id = events.insert(event);
        res.json(events.get(id));
    });
