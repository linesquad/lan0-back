import CategoryRepository from "../repositories/categoryRepo";

class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  async CreateCategoryService(input: IncomingCategoryData) {
    const { parentId } = input;
    const category = await this.repository.CreateCategory(input);
    if (!category) throw new Error();
    if (parentId) {
      const parentCategory = await this.repository.GetCategoryById(parentId);
      if (!parentCategory) throw new Error();
      parentCategory.subCategory.push(category._id);
      await parentCategory.save();
    }

    return category;
  }

  async GetCategoryByIdService(productId: string) {
    return this.repository.GetCategoryById(productId);
  }

  async UpdateCategoryService(input: { title: string; catId: string }) {
    const { title, catId } = input;
    const category = await this.repository.GetCategoryById(catId);
    if (!category) throw new Error();
    category.title = title;
    return await category.save();
  }

  async DeleteCategoryService(catId: string) {
    return await this.repository.DeleteCategory(catId);
  }

  async GetAllCategoriesService() {
    return await this.repository.GetAllCategories();
  }
}

export default CategoryService;
