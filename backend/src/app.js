import express from "express";
import router from "./routes/product.route.js";
import cors from "cors";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/products", router);
export default app;