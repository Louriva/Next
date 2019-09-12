var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    
})

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User');