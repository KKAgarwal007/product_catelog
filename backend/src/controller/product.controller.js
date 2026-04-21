import uploadFile from "../config/imagekit.js";
import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category} = req.body;
        if(!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingproduct = await Product.findOne({name});
        if(existingproduct) {
            return res.status(400).json({ message: "Product with this name already exists" });
        }
        const image = await uploadFile(req.file.buffer);
        const product = await Product.create({ name, description, price, category, image: image.url });
        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});  
        if(!products){
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ message: error });
    }   
};