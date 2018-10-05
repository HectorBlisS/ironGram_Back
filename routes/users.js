const express = require('express');
const router  = express.Router();
const path = require('path')
const User = require('../models/User')
const Picture = require('../models/Picture')
const {verifyToken} =require('../helpers/jwt')

router.put('/follow/:id', verifyToken, (req,res,next)=>{
    console.log(req.user)
    User.findOne({_id:req.user._id, following:req.params.id})
    .then(user=>{
        if(!user) return User.findByIdAndUpdate(req.user._id, {$push:{following:req.params.id}}, {new:true})
        else return User.findByIdAndUpdate(req.user._id, {$pull:{following:req.params.id}}, {new:true})
    })
    .then(user=>{
        res.json(user)
    })
})

router.get('/:id', (req,res,next)=>{
    Promise.all([User.findById(req.params.id), Picture.find({user:req.params.id})])
    .then(result=>{
        const user = result[0]
        user.pictures = result[1]
        res.status(200).json(user)
    })
})

module.exports = router