const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/authen')
const router = new express.Router()
const tasks = require('../models/task')

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
})

router.post('/Users/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generatetoken()
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/Users/logout',auth,async (req,res)=>{
    try {
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
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }
    catch(error){
        res.status(400).send(error)
    }
})
router.delete('/Users/me',auth,async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.user._id)
        await tasks.deleteMany({creator:user._id})
        res.send(req.user)
    }
    catch(err){
        res.status(500).send()
    }
})

module.exports =router
