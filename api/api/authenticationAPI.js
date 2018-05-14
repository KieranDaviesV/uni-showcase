//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
//this tutorial was used as a point of reference

const express = require('express');
const router = express.Router();
const RasPiTankController = require('../database/controllers/UserController');
const apiUtil = require('./apiUtils');
const config = require('../config/config.json');

const jwt = require('jsonwebtoken');



//Post request which sets up a JWT token so we have a passable object
//for the player once they've logged in
router.post('/v1/:resource', function(req,res){
  const resource = req.params.resource;

  if(resource == 'login'){

    const name = req.body.userName;

    RasPiTankController.findUserByUserName(name, function(err, results){

      if(err){
        return (
  				res.status(500).json({
  					confirmation: 'fail',
  					message: err
  				})
        );
      }

      if(results.length <= 0 || results == undefined) {
        return (
          res.status(404).json({
            confirmation: 'fail',
            message: "Authentication failed. User not found"
          })
        );
      }
      console.log(req.body.password);
      console.log(results);
      if(results[0].password !== req.body.password || results[0].password == undefined){
        return (
          res.status(404).json({
            confirmation: 'fail',
            message: "Authentication failed. Password incorrect "
          })
        );
      }

      const payload = {
        userName: results[0].userName,
        firstName: results[0].firstName,
        lastName: results[0].lastName,
        ownedGuns: results[0].ownedGuns,
        ownedMotors: results[0].ownedMotors,
        _id: results[0]._id
      }

      var token = jwt.sign(payload, config.secret,{
        expiresIn: "7 days"
      });

      return (
        res.status(201).json({
          confirmation: 'success',
          message: "Token",
          token: token
        })
      );
    })
  }
});

module.exports = router;
