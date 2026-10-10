import express from "express";
import productRoutes from "./modules/product/product.route";
import categoryRoutes from "./modules/category/category.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import morgan from "morgan";
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

//** Routes */
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

//** Middlewares */
app.use(morgan("dev"));
app.use(errorMiddleware);

export default app;
