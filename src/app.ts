import express from "express";
import productRoutes from "./modules/product/product.route";
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

app.use("/api/products", productRoutes);

export default app;
