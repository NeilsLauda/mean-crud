const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mean-crud';

mongoose.connect(URI, {useNewUrlParser: true}).then(db => {
console.log('database is connect');
}).catch((e) => {
    console.log(e);
});
module.exports= mongoose;