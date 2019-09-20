const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://teste:teste@cluster0-gfeet.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser:true});