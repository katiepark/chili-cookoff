var express = require('express');

exports.findAllVotes = function(req, res) {
    var db = req.db,
        collection = db.get('chili_vote');

    collection.find({}, {}, function(err, docs) {
        res.send(docs);
    });
};

exports.findVotesByDish = function(req, res) {
    var db = req.db,
        collection = db.get('chili_vote'),
        match_value = req.query.dishname;

    collection.find({ 'dishname': match_value }, function(err, docs) {
        if (err) {
            res.send('Could not query at that value');
        } else {
            res.send(docs);
        }
    });
}
