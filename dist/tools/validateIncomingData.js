"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateIncomingData {
    checkRequired(field, value) {
        if (!value)
            return { field, value: `The field ${field} is required` };
        return null;
    }
    checkType(value, type, field) {
        if (typeof value !== type) {
            return {
                received: typeof value || null,
                expected: type,
                message: `The field ${field} must be of type ${type}`,
            };
        }
        return null;
    }
    validateCategory(category) {
        const errors = [];
        const titleRequiredError = this.checkRequired("title", category.title);
        const titleTypeError = this.checkType(category.title, "string", "title");
        let parentIdTypeError;
        if (category.parentId) {
            parentIdTypeError = this.checkType(category.parentId, "string", "parentId");
            if (parentIdTypeError)
                errors.push(parentIdTypeError);
        }
        if (titleRequiredError)
            errors.push(titleRequiredError);
        if (titleTypeError)
            errors.push(titleTypeError);
        return errors.length > 0 ? errors : null;
    }
    validateBasicProduct(product) {
        const errors = [];
        const validationRules = [
            { field: "title", value: product.title, type: "string" },
            { field: "brand", value: product.brand, type: "string" },
            { field: "productType", value: product.productType, type: "string" },
            { field: "description", value: product.description, type: "string" },
            { field: "animalType", value: product.animalType, type: "string" },
            { field: "price", value: product.price, type: "number" },
            { field: "image", value: product.image, type: "string" },
            { field: "catId", value: product.catId, type: "string" },
        ];
        validationRules.forEach(({ field, value, type }) => {
            const requiredError = this.checkRequired(field, value);
            if (requiredError)
                errors.push(requiredError);
            const typeError = this.checkType(value, type, field);
            if (typeError)
                errors.push(typeError);
        });
        // Return errors if any, otherwise null
        return errors.length > 0 ? errors : null;
    }
    validateProductDetails(productDetails, productType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const errors = [];
        switch (productType) {
            case "toy":
                const validateToysRules = [
                    {
                        field: "size",
                        value: (_a = productDetails.toyDetails) === null || _a === void 0 ? void 0 : _a.size,
                        type: "string",
                    },
                    {
                        field: "recommendedAge",
                        value: (_b = productDetails.toyDetails) === null || _b === void 0 ? void 0 : _b.recommendedAge,
                        type: "string",
                    },
                    {
                        field: "sound",
                        value: (_c = productDetails.toyDetails) === null || _c === void 0 ? void 0 : _c.sound,
                        type: "boolean",
                    },
                ];
                validateToysRules.forEach(({ field, value, type }) => {
                    const requiredError = this.checkRequired(field, value);
                    if (requiredError)
                        errors.push(requiredError);
                    const typeError = this.checkType(value, type, field);
                    if (typeError)
                        errors.push(typeError);
                });
                return errors.length > 0 ? errors : null;
            case "accessory":
                const validateAccessoriesRules = [
                    {
                        field: "color",
                        value: (_d = productDetails.accessoryDetails) === null || _d === void 0 ? void 0 : _d.color,
                        type: "string",
                    },
                    {
                        field: "size",
                        value: (_e = productDetails.accessoryDetails) === null || _e === void 0 ? void 0 : _e.size,
                        type: "string",
                    },
                    {
                        field: "age",
                        value: (_f = productDetails.accessoryDetails) === null || _f === void 0 ? void 0 : _f.age,
                        type: "string",
                    },
                ];
                validateAccessoriesRules.forEach(({ field, value, type }) => {
                    const requiredError = this.checkRequired(field, value);
                    if (requiredError)
                        errors.push(requiredError);
                    const typeError = this.checkType(value, type, field);
                    if (typeError)
                        errors.push(typeError);
                });
                return errors.length > 0 ? errors : null;
            case "meal":
                const validateMealRules = [
                    {
                        field: "weight",
                        value: (_g = productDetails.mealDetails) === null || _g === void 0 ? void 0 : _g.weight,
                        type: "string",
                    },
                    {
                        field: "aroma",
                        value: (_h = productDetails.mealDetails) === null || _h === void 0 ? void 0 : _h.aroma,
                        type: "string",
                    },
                    {
                        field: "bleed",
                        value: (_j = productDetails.mealDetails) === null || _j === void 0 ? void 0 : _j.bleed,
                        type: "string",
                    },
                    {
                        field: "age",
                        value: (_k = productDetails.mealDetails) === null || _k === void 0 ? void 0 : _k.age,
                        type: "string",
                    },
                ];
                validateMealRules.forEach(({ field, value, type }) => {
                    const requiredError = this.checkRequired(field, value);
                    if (requiredError)
                        errors.push(requiredError);
                    const typeError = this.checkType(value, type, field);
                    if (typeError)
                        errors.push(typeError);
                });
                return errors.length > 0 ? errors : null;
            case "self care":
                const validateSeltCareRules = [
                    {
                        field: "weight",
                        value: (_l = productDetails.selfCareDetails) === null || _l === void 0 ? void 0 : _l.weight,
                        type: "string",
                    },
                    {
                        field: "aroma",
                        value: (_m = productDetails.selfCareDetails) === null || _m === void 0 ? void 0 : _m.aroma,
                        type: "string",
                    },
                    {
                        field: "age",
                        value: (_o = productDetails.selfCareDetails) === null || _o === void 0 ? void 0 : _o.age,
                        type: "string",
                    },
                ];
                validateSeltCareRules.forEach(({ field, value, type }) => {
                    const requiredError = this.checkRequired(field, value);
                    if (requiredError)
                        errors.push(requiredError);
                    const typeError = this.checkType(value, type, field);
                    if (typeError)
                        errors.push(typeError);
                });
                return errors.length > 0 ? errors : null;
        }
    }
    validateShipping(shipping) {
        const errors = [];
        const validateRules = [
            { field: "username", value: shipping.username, type: "string" },
            { field: "password", value: shipping.password, type: "string" },
        ];
        validateRules.forEach(({ field, value, type }) => {
            const requiredError = this.checkRequired(field, value);
            if (requiredError)
                errors.push(requiredError);
            const typeError = this.checkType(value, type, field);
            if (typeError)
                errors.push(typeError);
        });
        return errors.length > 0 ? errors : null;
    }
}
exports.default = ValidateIncomingData;
