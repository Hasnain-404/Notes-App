import User from "../models/userModels.js";

const saveUserInDB = async (req, res) => {
    try {

        const { id, firstName, lastName, email } = req.body;
        const existingUser = await User.findOne({ clerkId: id })

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists!"
            })
        }

        const newUser = new User({
            clerkId: id,
            firstName,
            lastName,
            email
        })

        await newUser.save();

        res.json({ message: "User saved successfully!" });

    } catch (error) {
        return res.json({
            success: false,
            message: "User not saved in DB!",
            error: error.message
        })
    }
}

export { saveUserInDB }