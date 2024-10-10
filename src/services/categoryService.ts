import CategoryRepository from "../repositories/categoryRepo";
import {
  APiError,
  BadRequestError,
  NotFoundError,
  serviceLayerError,
} from "../tools/customErrors";

class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  async CreateCategoryService(input: IncomingCategoryData) {
    const { parentId } = input;
    const category = await this.repository.CreateCategory(input);
    if (!category)
      throw new BadRequestError(
        "Something went wrong during create category process."
      );
    if (parentId) {
      const parentCategory = await this.repository.GetCategoryById(parentId);
      if (!parentCategory)
        throw new NotFoundError("Category not found by provided ID.");
      parentCategory.subCategory.push(category._id);
      await parentCategory.save();
    }

    return category;
  }

  async GetCategoryByIdService(catId: string) {
    try {
      const category = this.repository.GetCategoryById(catId);
      if (!category) throw new NotFoundError("Category Not Found Provided ID.");
      return category;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async UpdateCategoryService(input: { title: string; catId: string }) {
    try {
      const { title, catId } = input;
      const category = await this.repository.GetCategoryById(catId);
      if (!category) throw new NotFoundError("Category Not Found Provided ID.");
      category.title = title;
      return await category.save();
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async DeleteCategoryService(catId: string) {
    try {
      const removedCat = await this.repository.DeleteCategory(catId);
      if (!removedCat)
        throw new NotFoundError("Category Not Found Provided ID.");
      return true;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetAllCategoriesService() {
    try {
      const categories = await this.repository.GetAllCategories();
      if (categories.length < 1 || !categories)
        throw new NotFoundError(
          "Data is not available or where might be some issue."
        );
      return categories;
    } catch (error) {
      serviceLayerError(error);
    }
  }
}

export default CategoryService;
