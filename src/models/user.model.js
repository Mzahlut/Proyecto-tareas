import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trime: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

},
    {
        timestamps: true
    })

export default mongoose.model('user', userSchema)