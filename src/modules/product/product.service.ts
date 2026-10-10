import { AppError } from "../../utils/app-error";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";

export class ProductService {
  async createProduct(data: IProduct) {
    const existingProduct = await ProductModel.findOne({ slug: data.slug });
    if (existingProduct) {
      throw new AppError("Product name already been taken", 409);
    }
    return ProductModel.create(data);
  }

  async getProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [products, totalItems] = await Promise.all([
      ProductModel.find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      products,
      pagination: {
        currentPage: page,
        limit,
        totalPages,
        totalItems,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }
}
