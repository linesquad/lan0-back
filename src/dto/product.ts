import { AccessoryDetailType } from "./accessory";
import { MealDetailType } from "./meal";
import { SelfCareDetailType } from "./selfcare";
import { ToyDetailType } from "./toy";

export interface IncomingProductData {
  brand: string;
  productType: string;
  description: string;
  title: string;
  breed: string;
  code: string;
  discount: number;
  animalType: string;
  price: number;
  image: string;
  catId: string;
  mealDetails: MealDetailType | null;
  accessoryDetails: AccessoryDetailType | null;
  toyDetails: ToyDetailType | null;
  selfCareDetails: SelfCareDetailType | null;
}

export interface MainProductData {
  brand: string;
  productType: string;
  description: string;
  title: string;
  discount: number;
  animalType: string;
  price: number;
  image: string;
  catId: string;
  mealDetails: string | null;
  accessoryDetails: string | null;
  toyDetails: string | null;
  selfCareDetails: string | null;
}

export interface ProductDocs extends MainProductData {
  _id: string;
  shippingDatails: string;
  clickCount: number;
  orderCount: number;
  createdAt: Date;
}
