var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');

import {
    MyGraphQLSchema
}
from './schema.js';

import {
    StarWarsSchema
}
from './starWarsSchema.js';


var app = express();

app.configure(function() {
    app.use('/graphql', graphqlHTTP({schema: StarWarsSchema,graphiql: true}));
});

var myLogger = function(req, res, next) {
    console.log(req.originalUrl);
    next();
};

app.use(myLogger);

var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});