var router = module.exports = require('express').Router();
var login  = require('./login');

var db = new (require('locallydb'))('./data');
var events = db.collection('events');

router.route('/api/events')
    .all(login.required)
    .get(function (req, res) {
        res.json(events.toArray());
    })
    .post(function (req, res) {
        var event = req.body;
        event.userId = req.user.cid;
        var id = events.insert(event);
        res.json(events.get(id));
    });
