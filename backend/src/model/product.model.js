import mongoose  from "mongoose";


const arrayLimit = val => {
    return val.length > 0;
}


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    price: {    
        type: Number,
        required: true
    },  
    category: {
        type: String,
        required: true      
    },
    image :{
        type : Array,
        required : true,
        validate : [arrayLimit, '{PATH} must have at least 1 image']
    }},{ timestamps: true }
);



const Product = mongoose.model("Product", productSchema);

export default Product;
