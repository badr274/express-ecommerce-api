import { AppError } from "../../utils/app-error";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";
import slugify from "slugify";

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

  async getProduct(id: string) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }

    return product;
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    const updateData = { ...data };

    if (updateData.name !== undefined) {
      const slug = slugify(updateData.name, {
        lower: true,
        strict: true,
      });

      const existingProduct = await ProductModel.findOne({
        slug,
        _id: { $ne: id },
      });
      if (existingProduct) {
        throw new AppError("Product name already been taken", 409);
      }

      updateData.slug = slug;
    }

    const product = await ProductModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    return product;
  }

  async deleteProduct(id: string) {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
