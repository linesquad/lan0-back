export interface AccessoryDetailType {
  color: string;
  size: string;
  age: string;
}

export interface AccessoryDocs extends AccessoryDetailType {
  _id: string;
  createdAt: Date;
}
