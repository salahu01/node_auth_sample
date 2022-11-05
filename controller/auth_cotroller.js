const usera_model = require("../model/user_model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.signUp = async (req, res) => {
  try {
    if (!req.body.email || !req.body.name || !req.body.password) {
      res.status(404).json({ error: "Pass currect data" ,status:false,results:{});
      return;
    }
    const user = await usera_model.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ error: "User Already Exists" ,status:false,results:{});
      return;
    }
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = { ...req.body, password };
    const userData = await usera_model.create(data);
    const token = await jwt.sign({ user }, "fake-jwt-secret");
    res.status(201).json({
    error:"",
    status:true,
    results:{
      name: userData.name,
      email: userData.email,
      id: userData.id,
      access_token: token,
    }
    });
  } catch (error) {
    res.status(404).json({ error: error ,status:false,results:{});
  }
};

exports.logIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(404).json({ error: "Pass currect data" ,status:false,results:{});
      return;
    }
    const user = await usera_model.findOne({ email: req.body.email });
    if (!user) {
      res.status(204).json({ error: "User not found",status:false,results:{}});
      return;
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(200).json({ error: "Wrong password" ,status:false,results:{}});
      return;
    }

    const token = await jwt.sign({ user }, "fake-jwt-secret");

    res.status(201).json({
    error:"",
    status:false,
    results:{
      name: user.name,
      email: user.email,
      id: user.id,
      access_token: token,
    }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error ,status:false,results:{});
  }
};
