const mongoose = require("mongoose")

const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Title of todo is required"],
        maxLength: [50, "Maximum length of name is 50 charecters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Title of todo is required"],
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    appwriteId: {
        type: String,
        required: [true, "AppWrite Id is required"],
    },
    todos: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "todo",
            required: [true, "Todo Id is required to store todo for user"]
        }],
    }
}, {
    timestamps: true
})

module.exports = model("user", UserSchema)