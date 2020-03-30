'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const errorHandler = require ('errorhandler');
const rsa = require('rsa_module');

const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use(errorHandler());

let counter;

const crypto = new rsa.rsa(1024);

// Public keys request
app.get('/keys', function (req, res){
    counter ++;
    console.log('***** seq: ' + counter + ' keys request *****');
    // console.log('pub_e: ' + crypto.keys().pub_e.toString());
    // console.log('pub_n: ' + crypto.keys().pub_n.toString());
    res.status(200).json(crypto.keys());
});

app.post('/message', function(req, res){
    counter ++;
    console.log('***** seq: ' + counter + ' Decrypt request *****')
    console.log('message received: ' + req.body.message);
    console.log('message decrypted: ' + crypto.decrypt(req.body.message));
    res.status(200).json({response: 'ok'});
});

app.post('/bsign', function(req, res){
    counter ++;
    console.log('***** seq: ' + counter + ' Sign blinded message request *****')
    console.log('message received for sign: ' + req.body.message);
    console.log('message signed: ' + crypto.blindSign(req.body.message));
    res.status(200).json({response: crypto.blindSign(req.body.message)});
});

app.listen(port, function(req, res){
    counter = 0;
    console.log('Server started at: ' + port);
});
