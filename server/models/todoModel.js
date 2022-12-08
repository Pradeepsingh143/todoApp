const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [35, "Max length of title is 35 char"],
        trim: true,
    },
    task: {
        type: [String],
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User Id is required to create a todo"]
    }
    },{
        timestamps: true
    });


module.exports = model('todo', todoSchema);
