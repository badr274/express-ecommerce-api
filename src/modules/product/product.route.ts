import { Router } from "express";
import { ProductController } from "./product.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { paginationSchema } from "../../utils/validation/pagination.validation";
import { idParamsSchema } from "../../utils/validation/common.validation";

const router = Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } =
  new ProductController();

router
  .route("/")
  .get(validateRequest({ query: paginationSchema }), getProducts)
  .post(validateRequest({ body: createProductSchema }), createProduct);
router
  .route("/:id")
  .get(validateRequest({ params: idParamsSchema }), getProduct)
  .put(
    validateRequest({ params: idParamsSchema, body: updateProductSchema }),
    updateProduct,
  )
  .delete(validateRequest({ params: idParamsSchema }), deleteProduct);

export default router;
