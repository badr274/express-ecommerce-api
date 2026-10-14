import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import slugify from "slugify";
import { IProduct } from "./product.types";

const productService = new ProductService();
export class ProductController {
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IProduct = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      };
      const product = await productService.createProduct(payload);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = res.locals.validated?.query;
      const { products, pagination } = await productService.getProducts(
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        data: products,
        results: products.length,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const product = await productService.getProduct(id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };
  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const product = await productService.updateProduct(id, req.body);
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const product = await productService.deleteProduct(id);
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
}
