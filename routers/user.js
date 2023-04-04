const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/authen')
const router = new express.Router()
const tasks = require('../models/task')


// router.get('/test',(req,res)=>{
//     res.send('This is from my new file')
// })

// app.post('/Users',(req,res)=>{
//       // res.send(req.body)
//     // res.send('Testing!')
//     const user1 = new User(req.body)
//     user1.save()
//     .then(() => {
//         res.send(user1)
//     })
//     .catch((err) => {
//         // res.send('Invalid input')
//         res.status(400)
//         res.send(err)
//         // res.status(400).send(err)
//     });
// })

router.post('/Users',async(req,res)=>{
    const user1 = new User(req.body)
  
    try{
        const createUser= await user1.save()
        const token = await user1.generatetoken()
        res.status(201).send({createUser,token})
    }

    catch(err){
        res.status(400).send(err)
    }
    // console.log(user1);
})

router.post('/Users/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generatetoken()
        // res.send({user,token})
        // res.send({user:user.getpublicprofile(),token})
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/Users/logout',auth,async (req,res)=>{
    try {
        // req.user.tokens=[]
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !=req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/Users/logoutall',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return false
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// app.get('/Users',(req,res)=>{
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((err) => {
//         res.status(500).send()
//     });
// })

router.get('/Users',auth,async(req,res)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(500).send()
    }
})

router.get('/Users/me',auth,async(req,res)=>{
    res.send(req.user)
})

// for authentication we need to set key value pairs
// Authorization Bearer token

// app.get('/Users/:id',(req,res)=>{
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if(!user)
//         return res.status(404).send()
//         res.send(user)
//     }).catch((err) => {
//         res.status(500).send()
//     });
// })

// router.get('/Users/:id',async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const user= await User.findById(_id)
//         if(!user)
//         return res.status(404).send()
//         res.send(user)
//     }
//     catch(err){
//         res.status(500).send()
//     }
// })

router.patch('/Users/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']
    const isvalid= updates.every((update)=>{
        return allowedupdates.includes(update)
    })

    if(!isvalid){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        // const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        // bypasses route
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // if(!user)
        // return res.status(404).send()
        res.send(req.user)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// :id->me
router.delete('/Users/me',auth,async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        const user = await User.findByIdAndDelete(req.user._id)
        // if(!user)
        // return res.status(404).send()
        // await req.user.remove()
        await tasks.deleteMany({creator:user._id})
        res.send(req.user)
    }
    catch(err){
        res.status(500).send()
    }
})

module.exports =router