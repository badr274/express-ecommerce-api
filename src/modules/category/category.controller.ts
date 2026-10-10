import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import slugify from "slugify";
import { AppError } from "../../utils/app-error";
import { ICategory } from "./category.types";

const categoryService = new CategoryService();

export class CategoryController {
  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: ICategory = {
        name: req.body.name,
        slug: slugify(req.body.name),
      };
      const category = await categoryService.createCategory(payload);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = res.locals.pagination;
      const { categories, pagination } = await categoryService.getCategories(
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        data: categories,
        results: categories.length,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const category = await categoryService.getCategory(id);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const category = await categoryService.updateCategory(id, req.body);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };
}
