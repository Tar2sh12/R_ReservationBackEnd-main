const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required : true},
  email: { type: String, required : true, unique: true},
  password: { type: String, required : true},
  role: { type: String, enum: [ 'Vendor'],required : true },
});

vendorSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email, password });

    if (!user) {
      console.log("Invalid email or password");
    }

    return user;
};

module.exports = mongoose.model('Vendor', vendorSchema);