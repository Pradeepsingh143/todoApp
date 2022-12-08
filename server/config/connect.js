const mongoose = require('mongoose');

const {MONGO_URI} = process.env

exports.connect = ()=>{
    mongoose.connect(MONGO_URI)
    .then((conn)=>{
        console.log(`Db connect sucessfully on "${conn.Connection.name}"`);
    })
    .catch((err)=>{
        console.log(`Db connection failed: ${err.message}`);
        console.log(process.exit(1));
    })
}