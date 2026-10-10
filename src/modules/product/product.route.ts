import { Router } from "express";
import { ProductController } from "./product.controller";
import { paginationMiddleware } from "../../middlewares/pagination.middleware";

const router = Router();
const { createProduct, getProducts } = new ProductController();

router.route("/").get(paginationMiddleware, getProducts).post(createProduct);

export default router;
