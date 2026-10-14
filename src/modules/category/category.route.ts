import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";
import { paginationSchema } from "../../utils/validation/pagination.validation";
import { idParamsSchema } from "../../utils/validation/common.validation";

const router = Router();
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = new CategoryController();

router
  .route("/")
  .get(
    validateRequest({
      query: paginationSchema,
    }),
    getCategories,
  )
  .post(validateRequest({ body: createCategorySchema }), createCategory);
router
  .route("/:id")
  .get(validateRequest({ params: idParamsSchema }), getCategory)
  .put(
    validateRequest({ params: idParamsSchema, body: updateCategorySchema }),
    updateCategory,
  )
  .delete(validateRequest({ params: idParamsSchema }), deleteCategory);
export default router;
