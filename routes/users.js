const express = require('express');
const router  = express.Router();
const path = require('path')
const User = require('../models/User')
const {verifyToken} =require('../helpers/jwt')

router.get('/:id', (req,res,next)=>{
    User.findById(req.params.id)
    .then(user=>res.status(200).json(user))
    .catch(e=>next())
})

module.exports = router