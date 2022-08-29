var jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const user_model = require("../model/user_model");

const auth = async (req, res, next) => {
  if(req.headers && req.headers.authorization){
    try {
      const token = req.headers.authorization;
      await jwt.verify(token,'fake-jwt-secret');
      next();
    } catch (error) {
        res.status(401).json({error:'Unauthorized'});
    }
  }else{
    res.status(401).json({error:'headers error'});
  }
};
   
module.exports = auth;
