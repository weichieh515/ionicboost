var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todosSchema = new Schema({
    title: String,
    done: Boolean,
    name: String
});

var Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;