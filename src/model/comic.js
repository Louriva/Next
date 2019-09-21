var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const comicSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    author: {type: String, require: true},
    genre: {type: String, required: true},
    image:{type: String},
    comicLink:{type: String},
    avarage: {type: Array},
    rating: {type: Number}
    });

const Comic = mongoose.model('Comic',comicSchema);

module.exports = Comic;