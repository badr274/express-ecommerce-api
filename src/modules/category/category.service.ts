import { AppError } from "../../utils/app-error";
import { categoryModel } from "./category.model";
import { ICategory } from "./category.types";

export class CategoryService {
  async createCategory(data: ICategory) {
    const existingCategory = await categoryModel.findOne({
      slug: data.slug,
    });
    if (existingCategory) {
      throw new AppError("Category already exists", 409);
    }
    return categoryModel.create(data);
  }

  async getCategories() {
    return categoryModel.find();
  }
}
