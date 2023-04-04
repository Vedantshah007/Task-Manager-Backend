const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const tasks = require('./models/task')
const userrouter = require('./routers/user')
const taskrouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     // console.log(req.method,req.path)
//     // next()
//     if(req.method==='GET'){
//         res.send('Get requests are disabled')
//     }
//     else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site under maintenance')
// })

app.use(express.json())

// const router = new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('This is from my another router')
// })
// app.use(router)

app.use(userrouter)
app.use(taskrouter)

app.listen(port,()=>{
    console.log("Running on port "+port)
})   

// rather than storing passwords as a plain text we store it as hashed values using bcrypt

// const bcrypt = require('bcryptjs')

// const myfuction= async (password)=>{
//     const password1='tgvs@1234'
//     const hashedpassword=await bcrypt.hash(password,8)

//     console.log(password1)
//     console.log(hashedpassword)

//     const ismatch = await bcrypt.compare(password,hashedpassword)
//     console.log(ismatch)
// }

// myfuction('tgvs@1234')

// const jwt = require('jsonwebtoken')

// const myfuction= async ()=>{
//     const token = jwt.sign({_id:'hsbChbaj'},'vedantishardworking',{expiresIn :'7 days'})
//     console.log(token)

//     const data=jwt.verify(token,'vedantishardworking')
//     console.log(data)
// }

// myfuction()

// we can get value back in encrypted but not in hashing algorithms

// const pet= {
//     name:'Tom'
// }

// pet.toJSON = function(){
    // console.log(this)
    // return this
//     return {}
// }

// console.log(JSON.stringify(pet))

// const main = async ()=>{
//     const task = await tasks.findById('6429047fdf1e38f07f9ef848')
//     // console.log(task)
//     await task.populate('creator')
//     // console.log(task.creator)

//     const user = await User.findById('642900b7aba858c3b4ead74e')
//     await user.populate('tasks') 
//     // console.log(user.tasks) 
// }


// main()