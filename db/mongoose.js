const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true
    // useCreateIndex:true
})

// const User = mongoose.model('Users',{
//     name:{
//         type:String,
//         //
//         required:true,
//         trim:true
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0)
//             throw new Error('Age must be a positive number')
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Invalid Email')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Invalid password')
//             }
//         }
//     }
// })

// const me = new User({
//     name:'tgvs',
//     // age:19
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// });

// const tasks = mongoose.model('tasks',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const you = new tasks({
//     description:'Giving Codeforces contest',
//     completed:false
// })

// you.save().then(() => {
//     console.log(you)
// }).catch((error) => {
//     console.log(error)
// });