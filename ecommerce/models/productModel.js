import mongoose from "mongoose";

//create collection in DB
const productSchema = mongoose.Schema({
    name:{  type: String, required: true},
    category:{type: String, required: true},
    price:{  type: Number, required: true},
    image:{type: String, required: true}
}, {
    //for date
    timestamp:true
});

const Product = mongoose.model("Product",productSchema)
export default Product;
