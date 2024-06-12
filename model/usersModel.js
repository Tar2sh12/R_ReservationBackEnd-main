const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required : true},
  email: { type: String, required : true, unique: true},
  password: { type: String, required : true},
  role: { type: String, enum: [ 'Vendor','Customer'],required : true },
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email, password });

    if (!user) {
      console.log("Invalid email or password");
    }

    return user;
};

module.exports = mongoose.model('Users', UserSchema);