const mongoose = require('mongoose')
const validator = require('validator')

const tasks = mongoose.model('tasks',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    }
})

module.exports=tasks