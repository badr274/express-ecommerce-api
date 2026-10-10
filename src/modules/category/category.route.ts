import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();
const { getCategories, createCategory } = new CategoryController();

router.route("/").get(getCategories).post(createCategory);

export default router;
