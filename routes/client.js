var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next){ 
    res.render(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = router;