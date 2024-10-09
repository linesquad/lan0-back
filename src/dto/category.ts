interface IncomingCategoryData {
  title: string;
  parentId: string | null;
}

interface CategoryDocs extends IncomingCategoryData {
  _id: string;
  subCategory: string[];
  products: string[];
  createdAt: Date;
}
