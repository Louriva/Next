var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const comicSchema = new Schema({
    title: {type: String},
    description: {type: String},
    author: {type: String},
    genre: {type: String},
    rating: {type: Array},
    average: {type: Number},
    });

const Comic = mongoose.model('Comic',comicSchema);

module.exports = Comic;