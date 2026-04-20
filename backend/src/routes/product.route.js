import express from "express";
import { createProduct } from "../controller/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add",upload.single("image"),createProduct);

export default router;