var express = require('express');
var router = express.Router();
var Todos = require('../schema/todos.js');
var mongojs = require('mongojs');


router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


router.get('/todos', function (req, res, next) {
    Todos.find({}, function (err, todos) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(todos).status(200);
        }
    });
});

router.get('/todos/:name', function (req, res, next) {

    Todos.find({
        name: req.params.name
    }, function (err, todos) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(todos).status(200);
        }
    });
});

/* GET One Todo with the provided ID */
router.get('/todo/:id', function (req, res, next) {
    Todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

/* POST/SAVE a Todo */
router.post('/todo', function (req, res, next) {
    
    var todo = new Todos(req.body);

        todo.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    
});

/* PUT/UPDATE a Todo */
router.put('/todo/:id', function (req, res, next) {

    var todo = req.body;

    todo.done = todo.done == 'true' ? false : true;

    Todos.update({
        _id: mongojs.ObjectId(req.params.id)
    }, {$set:todo}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});

/* DELETE a Todo */
router.delete('/todo/:id', function (req, res) {
    Todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});



module.exports = router;