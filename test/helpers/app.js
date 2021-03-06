// Test app
var express = require('express'),
    app = module.exports = express(),
    Chance = require('chance'),
    chance = new Chance(),
    batch = require('../../lib/batch-request')();

app.use(express.json());

// An endpoint to use the batch middleware
app.post('/batch', batch.validate, batch);

// Let's make some fake endpoints
app.get('/users/:id/name', function(req, res) {
    res.json(chance.name());
});

app.get('/users/:id/email', function(req, res) {
    res.json(chance.email());
});

app.get('/users/:id/company', function(req, res) {
    res.json(chance.capitalize(chance.word()));
});

app.get('/users/:id/hammertime', function(req, res) {
    res.json(new Date().getTime());
});

app.get('/users/:id/delay', function(req, res, done) {
    setTimeout(function() {
        res.json(new Date().getTime());
        done();
    }, 250);
});


app.listen(3000);
