import { AppError } from "../../utils/app-error";
import { categoryModel } from "./category.model";
import { ICategory } from "./category.types";
import slugify from "slugify";

export class CategoryService {
  async createCategory(data: ICategory) {
    const existingCategory = await categoryModel.findOne({
      slug: data.slug,
    });
    if (existingCategory) {
      throw new AppError("Category name already been taken", 409);
    }
    return categoryModel.create(data);
  }

  async getCategories(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [categories, totalItems] = await Promise.all([
      categoryModel
        .find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),

      categoryModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      categories,
      pagination: {
        currentPage: page,
        limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  async getCategory(id: string) {
    const category = await categoryModel.findById(id);
    if (!category) {
      throw new AppError("Category Not Found", 404);
    }

    return category;
  }

  async updateCategory(id: string, data: Partial<ICategory>) {
    const updateData = { ...data };

    if (data.name !== undefined) {
      const slug = slugify(data.name, {
        lower: true,
        strict: true,
      });
      const existingCategory = await categoryModel.findOne({
        slug,
        _id: { $ne: id },
      });
      if (existingCategory) {
        throw new AppError("Category name already been taken", 409);
      }
      updateData.slug = slug;
    }

    const category = await categoryModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!category) {
      throw new AppError("Category Not Found", 404);
    }

    return category;
  }

  async deleteCategory(id: string) {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }
}
