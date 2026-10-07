import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();
const productController = new ProductController();

router.post("/", productController.createProduct.bind(productController));
router.get("/", productController.getProducts.bind(productController));

export default router;
