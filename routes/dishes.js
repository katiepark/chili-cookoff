var express = require('express');

// Q: How to structure this in a less inane way?
exports.findDishes = function(req, res) {
    var db = req.db,
        collection = db.get('chili_info'),
        query_params = req.query;

    // This seems pretty stupid but I just wanna query by vegetarian chili
    for (param in query_params) {
        if (query_params[param] === 'true') {
            query_params[param] = true;
        } else if (query_params[param] === 'false') {
            query_params[param] = false;
        }
    }

    collection.find(query_params, function(err, docs) {
        if (err) {
            res.send('Could not query at that value');
        } else {
            res.send(docs);
        }
    });
};
