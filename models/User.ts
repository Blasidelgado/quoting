import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [4, "Name must be at least 4 characters long"],
        maxLength: [30, "Name should be less than 30 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const User = models.User || model("User", UserSchema);

export default User;