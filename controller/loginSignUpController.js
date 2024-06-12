const Vendor = require('../model/vendorModel');
const Customer = require('../model/customerModel');
const User = require('../model/usersModel');


const loginUser = async (req, res) => {
      const { email, password, role } = req.body;
  
      let user;
      user = await User.login(email, password);
  
      if (!user) {
        return res.json({  message: 'Invalid email or password ' });
      }
      res.json({  user });
  };



  const signupUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    let user;
    try{user = new User({name,email,password,role});}
    catch{
      return res.json({  message: 'Invalid role' });
    }
    let savedUser;
    try { savedUser = await user.save();}
    catch {
      res.json({message : 'Email already Exists!'});
      return;
    }
    res.json({ savedUser });
   
  };

  
   
  
  module.exports = { loginUser,signupUser };