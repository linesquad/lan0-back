export interface SelfCareDetailType {
  usageInstructions: string;
  ingredients: string[] | null;
  volume: string;
}

export interface SelfCareDocs extends SelfCareDetailType {
  _id: string;
  createdAt: Date;
}
