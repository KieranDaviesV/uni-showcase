// https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
// this tutorial helped me complete this code off

const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

function verifyToken(req,res,next){

  var token = req.headers['x-access-token'];

  //check if there is a token
  if(!token){
    return (
      res.status(403).json({
        confirmation: 'fail',
        message: "No token set"
      })
    );
  }
  //jwt code to check if the code is from this api
  jwt.verify(token, config.secret, function(err, decoded){
    if(err){
      return (
        res.status(500).json({
          confirmation: 'fail',
          message: err.message
        })
      );
    }
    req.decodedId = decoded._id;
    //to the next function
    next();
  });
}

module.exports = verifyToken;
