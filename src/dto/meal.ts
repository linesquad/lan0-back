export interface MealDetailType {
  weight: string;
  aroma: string;
  bleed: string;
  age: string;
}

export interface MealDocs extends MealDetailType {
  _id: string;
  createdAt: Date;
}
