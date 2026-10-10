import { Router } from "express";
import { CategoryController } from "./category.controller";
import { paginationMiddleware } from "../../middlewares/pagination.middleware";

const router = Router();
const { getCategories, createCategory, getCategory, updateCategory } =
  new CategoryController();

router.route("/").get(paginationMiddleware, getCategories).post(createCategory);
router.route("/:id").get(getCategory).put(updateCategory);
export default router;
