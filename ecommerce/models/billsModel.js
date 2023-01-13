import mongoose from "mongoose";

//create collection in DB
const billsSchema = mongoose.Schema({
    customerName:{type: String, required: true},
    customerPhone:{ type: String, required: true},
    address:{type: String, required: true},
    paymentMethod:{type: String,required: true},
    totalAmount:{type: Number,required: true},
    cartItems:{
        type:Array, required:true
    }
}, {
    //for date
    timestamps:true
});

const Bills = mongoose.model("Bills", billsSchema)
export default Bills;
