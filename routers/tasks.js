const express = require('express')
const tasks = require('../models/task')
const auth = require('../middlewares/authen')
const router = new express.Router()

// app.post('/tasks',(req,res)=>{
//     const task1 = new tasks(req.body)
//     task1.save()
//     .then(() => {
//         res.send(task1)
//     })
//     .catch((err) => {
//         // res.send('Invalid input')
//         res.status(400)
//         res.send(err)
//         // res.status(400).send(err)
//     });
// })

router.post('/tasks',auth,async(req,res)=>{
    // const task1 = new tasks(req.body)
    const task1 = new tasks({
        ...req.body,
        creator:req.user._id
    })
  
    try{
        const createtask= await task1.save()
        res.status(201).send(createtask)
    }

    catch(err){
        res.status(400).send(err)
    }
})

// app.get('/tasks',(req,res)=>{
//     tasks.find({}).then((tasks1) => {
//         res.send(tasks1)
//     }).catch((err) => {
//         res.status(500).send()
//     });
// })

router.get('/tasks',auth,async(req,res)=>{
    try{
        const tasks1= await tasks.find({creator:req.user._id})
        res.send(tasks1)
    }
    catch(err){
        res.status(500).send()
    }
})
  
// app.get('/tasks/:id',(req,res)=>{
//     const _id = req.params.id
//     tasks.findById(_id).then((task) => {
//         if(!task)
//         return res.status(404).send()
//         res.send(task)
//     }).catch((err) => {
//         res.status(500).send()
//     });
// })

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        // const task= await tasks.findById(_id)
        const task = await tasks.findOne({_id,creator:req.user._id})
        if(!task)
        return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['description','completed']
    const isvalid= updates.every((update)=>{
        return allowedupdates.includes(update)
    })

    if(!isvalid){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        const task = await tasks.findOne({_id:req.params.id,creator:req.user._id})
        // const task = await tasks.findById(req.params.id)
        
        // const task = await tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task) 
        return res.status(404).send()
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.send(task)
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task = await tasks.findOneAndDelete({_id:req.params.id,creator:req.user._id})
        // const task = await tasks.findByIdAndDelete(req.params.id)
        if(!task)
        return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send()
    }
})

module.exports =router