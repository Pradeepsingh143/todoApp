const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
        title:{
            type:String,
            required:[true, "Tittle is required"],
            trim: true,
            unique:true,
        },
        task:{
            type: [String],
            trim: true
        }
});



module.exports = mongoose.model('todo', todoSchema );
