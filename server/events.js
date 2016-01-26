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
        var event = req.body,
	        id;
        event.userId = req.user.cid;
		if(event.cid === undefined){
			events.insert(event);
		}else{
			events.update(event.cid, event);
		}

		var e = events.toArray();
		e = e.filter(function(evnt){
			return evnt.userId === req.user.cid;
		});
        res.json(e);
    })
	.delete(function (req, res) {
        var cid = req.body.cid,
        userId = req.user.cid;
		if(events.get(cid) && events.get(cid).userId === userId){
			events.remove(cid);
		}
        res.json({});
    });
