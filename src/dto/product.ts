interface IncomingProductData {
  brand: string;
  type: string;
  description: string;
  title: string;
  weight: string;
  animalType: string;
  price: string;
  catId: string;
  age: string;
  breed: string;
  discount: number;
  aroma: string;
}

interface ProductDocs extends IncomingProductData {
  _id: string;
  shippingDatails: string;
  clickCount: number;
  orderCount: number;
  createdAt: Date;
}
