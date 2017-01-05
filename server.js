var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//
var api = require('./routes/api');
var client = require('./routes/client');
//
var port = 8087;
var mongoUrl = 'mongodb://studio.mis.ccu.edu.tw/ionicboost';
var app = express();
//
mongoose.connect(mongoUrl, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected to ' + mongoUrl);
    }
});



app.set('views', path.join(__dirname, '../public/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api', api);
app.use('/', express.static(path.join(__dirname, 'public/dist')), client);



app.listen(port, function () {
    console.log('Server started on port ' + port);
});