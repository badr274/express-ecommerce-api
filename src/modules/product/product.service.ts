import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";

export class ProductService {
  async createProduct(data: IProduct) {
    return ProductModel.create(data);
  }

  async getProducts() {
    return ProductModel.find();
  }
}
