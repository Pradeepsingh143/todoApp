const User = require("../../models/userModel")

exports.createUser = async (req, res) => {
    try{
        const {name, email, appwriteId} = req.body

        if(!name){
            throw new Error("Name is required, Please pass name to create a user")
        }

        if(!email){
            throw new Error("Email is required, Please pass email to create a user")
        }

        if(!appwriteId){
            throw new Error("Appwrite ID is required, Please pass name to create a user")
        }

        const user = await User.create({name, email, appwriteId})

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
    } catch(error){
        console.log("Error in create user controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in create user controller",
            error : error.message
        })

    }
}