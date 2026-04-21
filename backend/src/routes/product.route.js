import express from "express";
import { createProduct, getProducts } from "../controller/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add",upload.single("image"),createProduct);
router.get("/get",getProducts);

export default router;