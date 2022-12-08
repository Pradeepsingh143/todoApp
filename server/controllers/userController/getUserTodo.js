const User = require("../../models/userModel")

 exports.getUserTodos = async (req, res) => {
    try{
        const { userId } = req.query

        if(!userId){
            throw new Error("Appwrite user id is required to fetch the todo")
        }

        const user = await User.find({appwriteId: userId}).populate('todos')

        res.status(200).json({
            success: true,
            message: "User Todos fetched successfully",
            user: user
        })
    } catch(error){
        console.log("Error in get user todos controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in get user todos controller",
            error
        })
    }
}