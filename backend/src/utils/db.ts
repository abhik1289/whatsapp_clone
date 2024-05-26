import mongoose from "mongoose";



mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Connected!')).catch((err) => console.log(err));