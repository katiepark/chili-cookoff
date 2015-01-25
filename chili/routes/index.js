var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The PostGraphics chili cook-off' });
});

/* GET to New Chili Service */
router.get('/newchili', function(req, res) {
    var db = req.db,
        collection = db.get('chili_info');

    collection.find({}, {}, function(e, docs) {
        res.render('newchili', {
            title: 'Add new chili',
            dishlist: docs
        });
    });
});

/* POST to New Chili Service */
router.post('/addchili', function(req, res) {
    var db = req.db;

    // Get form values from name attributes
    var dishname = req.body.chiliname,
        creator = req.body.chilicreator,
        vegetarian = req.body.chiliveg;

    // Set collection
    var collection = db.get('chili_info');

    // Submit to DB
    collection.insert({
        'dishname': dishname,
        'creator': creator,
        'vegetarian': vegetarian ? true : false
    }, function(err, doc) {
        if (err) {
            // Return an error if failure
            res.send('There was a problem adding information to the database.');
        } else {
            res.redirect('newchili');
        }
    });
});

/* GET to Chili Vote Service */
router.get('/chilivote', function(req, res) {
    var db = req.db;
    var collection = db.get('chili_info');
    collection.find({}, {}, function(e, docs){
        res.render('chilivote', {
            tagline: 'Chili cook-off',
            title: 'Rate the chili',
            dishlist: docs
        });
    });
});

/* POST to Chili Vote Service */
router.post('/submitvote', function(req, res) {
    var db = req.db,
        collection = db.get('chili_vote');

    var vote_info = req.body;

    collection.insert(vote_info, function(err, doc) {
        if (err) {
            res.send('There was a problem adding information to the database.');
        }
    });
});
module.exports = router;
