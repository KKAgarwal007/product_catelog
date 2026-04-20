import express from "express";
import router from "./routes/product.route.js";

const app = express();
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/products", router);
export default app;