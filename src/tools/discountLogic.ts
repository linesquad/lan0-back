import { ProductDocs } from "../dto/product";

function discountLogic(products: ProductDocs[]) {
  return products.map((p) => {
    const price = Number(p.price.toString());
    const currentPrice = p.discount > 0 ? price - price / p.discount : price;
    return {
      _id: p._id,
      title: p.title,
      image: p.image,
      price,
      dFlag: p.discount > 0 ? true : false,
      currentPrice: currentPrice.toFixed(2),
    };
  });
}

export default discountLogic;
