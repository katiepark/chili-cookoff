var express = require('express');

exports.findAllVotes = function(req, res) {
    var db = req.db,
        collection = db.get('chili_vote');

    collection.find({}, {}, function(err, docs) {
        res.send(docs);
    });
};
