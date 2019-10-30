const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    title:{type:String},
    say:{type:String},
    bigtitle:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'js'},

})
module.exports=mongoose.model('js',schema)