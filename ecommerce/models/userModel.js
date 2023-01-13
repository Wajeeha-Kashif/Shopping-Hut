import mongoose from "mongoose";

//create collection in DB
const userSchema = mongoose.Schema({
    name:{ type: String, required: true },
    userId:{ type: String, required: true },
    password:{ type: String, required: true },
    verified: {type:Boolean}
}, {
    //for date
    timestamp:true
});

const User = mongoose.model("User",userSchema)
export default User;
