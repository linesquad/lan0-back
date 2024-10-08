import CategoryModel from "../models/category";

class CategoryRepository {
  async CreateCategory(input: IncomingCategoryData) {
    try {
      return await CategoryModel.create(input);
    } catch (error) {
      throw error;
    }
  }

  async GetCategoryById(catId: string) {
    try {
      return await CategoryModel.findById(catId).populate({
        path: "subCategory",
        model: "Category",
      });
    } catch (error) {
      throw error;
    }
  }

  async DeleteCategory(catId: string) {
    try {
      return await CategoryModel.findByIdAndDelete(catId);
    } catch (error) {
      throw error;
    }
  }

  async GetAllCategories() {
    try {
      return await CategoryModel.find({ parentId: null }).populate({
        path: "subCategory",
        model: "Category",
      });
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryRepository;
