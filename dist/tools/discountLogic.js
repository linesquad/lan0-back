"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function discountLogic(products) {
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
exports.default = discountLogic;
