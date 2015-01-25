var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, world!' });
});

router.get('/dishlist', function(req, res) {
    var db = req.db;
    var collection = db.get('dishcollection');
    collection.find({}, {}, function(e,docs) {
        res.render('dishlist', {
            'dishlist': docs
        });
    });
});

/* GET to New Chili Service */
router.get('/newchili', function(req, res) {
    res.render('newchili', { title: 'Add new chili' });
});

module.exports = router;
