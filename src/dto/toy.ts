export interface ToyDetailType {
  size: string;
  recommendedAge: string;
  sound: boolean;
}

export interface ToyDocs extends ToyDetailType {
  _id: string;
  createdAt: Date;
}
