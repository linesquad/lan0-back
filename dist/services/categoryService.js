"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRepo_1 = __importDefault(require("../repositories/categoryRepo"));
const customErrors_1 = require("../tools/customErrors");
class CategoryService {
    constructor() {
        this.repository = new categoryRepo_1.default();
    }
    CreateCategoryService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parentId } = input;
            const category = yield this.repository.CreateCategory(input);
            if (!category)
                throw new customErrors_1.BadRequestError("Something went wrong during create category process.");
            if (parentId) {
                const parentCategory = yield this.repository.GetCategoryById(parentId);
                if (!parentCategory)
                    throw new customErrors_1.NotFoundError("Category not found by provided ID.");
                parentCategory.subCategory.push(category._id);
                yield parentCategory.save();
            }
            return category;
        });
    }
    GetCategoryByIdService(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = this.repository.GetCategoryById(catId);
                if (!category)
                    throw new customErrors_1.NotFoundError("Category Not Found Provided ID.");
                return category;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    UpdateCategoryService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, catId } = input;
                const category = yield this.repository.GetCategoryById(catId);
                if (!category)
                    throw new customErrors_1.NotFoundError("Category Not Found Provided ID.");
                category.title = title;
                return yield category.save();
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    DeleteCategoryService(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedCat = yield this.repository.DeleteCategory(catId);
                if (!removedCat)
                    throw new customErrors_1.NotFoundError("Category Not Found Provided ID.");
                return true;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetAllCategoriesService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.repository.GetAllCategories();
                if (categories.length < 1 || !categories)
                    throw new customErrors_1.NotFoundError("Data is not available or where might be some issue.");
                return categories;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
}
exports.default = CategoryService;
