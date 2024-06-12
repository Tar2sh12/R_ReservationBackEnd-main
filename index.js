const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const dotenv = require('dotenv');    
const CustomerRouter = require('./routes/customerRouter');
const VendorRouter = require('./routes/vendorRouter');
const LoginSignUpRouter = require('./routes/LoginSignUpRouter');
const UploadRouter = require('./routes/uploadRouter');
const path =  require('path');

mongoose.connect('mongodb://127.0.0.1:27017/ResturantReservation')
.then(()=>{
    console.log('Mongo Connected');
})
.catch(()=>{
    console.log('Mongo not connected');
});

const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/api',CustomerRouter);
app.use('/api',VendorRouter);
app.use('/api',LoginSignUpRouter);
app.use('/api',UploadRouter);
app.use('/api/image',express.static(path.join(__dirname, 'public/images')));
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});