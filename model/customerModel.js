const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required : true},
  email: { type: String, required : true, unique: true},
  password: { type: String, required : true},
  role: { type: String, enum: [ 'Customer'] },
});

customerSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email, password });

  if (!user) {
    console.log("Invalid email or password");
  }

  return user;
};

module.exports = mongoose.model('Customer',  customerSchema );