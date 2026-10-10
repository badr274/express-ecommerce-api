import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import slugify from "slugify";

const categoryService = new CategoryService();

export class CategoryController {
  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = { name: req.body.name, slug: slugify(req.body.name) };
      const category = await categoryService.createCategory(payload);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  };
}
