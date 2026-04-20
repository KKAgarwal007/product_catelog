import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category} = req.body;
        console.log(req.file);
        if(!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingproduct = await Product.findOne({name});
        if(existingproduct) {
            return res.status(400).json({ message: "Product with this name already exists" });
        }
        const product = await Product.create({ name, description, price, category, image: req.file.path });
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};