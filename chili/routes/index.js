var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The PostGraphics chili cook-off' });
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

/* GET to New Chili Service */
router.get('/newchili', function(req, res) {
    res.render('newchili', { title: 'Add new chili' });
});

/* POST to New Chili Service */
router.post('/addchili', function(req, res) {
    var db = req.db;

    // Get form values from name attributes
    var chili_name = req.body.chiliname,
        chili_creator = req.body.chili_creator;

    // Set collection
    var collection = db.get('dishcollection');

    // Submit to DB
    collection.insert({
        'dishname': chili_name,
        'creator': chili_creator
    }, function(err, doc) {
        if (err) {
            // Return an error if failure
            res.send('There was a problem adding information to the database.');
        } else {
            // Set header so address bar doesn't still say /addchili
            res.location('dishlist');
            // Forward to success page
            res.redirect('dishlist');
        }
    });
});

/* POST to Chili Vote Service */
router.post('/submitvote', function(req, res) {
    var db = req.db,
        collection = db.get('chilivote');

    var dish_id = req.body.dish_id,
        dish_name = req.body.dish_name,
        vote_info = req.body.ratings;

    vote_info['dish_id'] = dish_id;
    vote_info['dish_name'] = dish_name;

    collection.insert(vote_info, function(err, doc) {
        if (err) {
            res.send('There was a problem adding information to the database.');
        }
    });
});
module.exports = router;
