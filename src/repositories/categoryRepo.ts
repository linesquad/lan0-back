import CategoryModel from "../models/category";
import { APiError } from "../tools/customErrors";

class CategoryRepository {
  async CreateCategory(input: IncomingCategoryData) {
    return await CategoryModel.create(input);
  }

  async GetCategoryById(catId: string) {
    return await CategoryModel.findById(catId).populate({
      path: "subCategory",
      model: "Category",
    });
  }

  async DeleteCategory(catId: string) {
    return await CategoryModel.findByIdAndDelete(catId);
  }

  async GetAllCategories() {
    return await CategoryModel.find({ parentId: null }).populate({
      path: "subCategory",
      model: "Category",
    });
  }
}

export default CategoryRepository;
