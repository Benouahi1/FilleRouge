const mongoose = require('mongoose')

const AdminSuperSchema = mongoose.Schema({
    AdminSuperName : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
       
    },
    password : {
        type : String,
        require : true 
    },
 },
)
module.exports =  mongoose.model('AdminSuper', AdminSuperSchema)