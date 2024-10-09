export interface SelfCareDetailType {
  age: string;
  weight: string;
  aroma: string;
}

export interface SelfCareDocs extends SelfCareDetailType {
  _id: string;
  createdAt: Date;
}
