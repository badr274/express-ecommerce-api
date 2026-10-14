import express from "express";
import productRoutes from "./modules/product/product.route";
import categoryRoutes from "./modules/category/category.route";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware";
import morgan from "morgan";
import { env } from "./config/env";
const app = express();
app.use(express.json());
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${env.nodeEnv}`);
}

app.get("/", (_req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

//** Routes */
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

//** Middlewares */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
