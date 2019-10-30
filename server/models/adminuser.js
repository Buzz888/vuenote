const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { type: String },
    username: { type: String },
    password: {
        type: String, 
        select:false,
        set: function (val) {
            return require('bcrypt').hashSync(val, 11)
        }
    },
})
module.exports = mongoose.model('adminuser', schema)