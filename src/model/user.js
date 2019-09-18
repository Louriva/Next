var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    comicList:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comic',
        
    }]
    
   
})

const User = mongoose.model('User', userSchema);

module.exports = User;