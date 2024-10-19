import { IncomingProductData } from "../dto/product";
import { RequiredResponse, ValidateType } from "../dto/validateResponse";

class ValidateIncomingData {
  private checkRequired(field: string, value: any): RequiredResponse | null {
    if (!value) return { field, value: `The field ${field} is required` };
    return null;
  }

  private checkType(
    value: any,
    type: string,
    field: string
  ): ValidateType | null {
    if (typeof value !== type) {
      return {
        received: typeof value || null,
        expected: type,
        message: `The field ${field} must be of type ${type}`,
      };
    }

    return null;
  }

  validateCategory(category: IncomingCategoryData) {
    const errors: (RequiredResponse | ValidateType)[] = [];

    const titleRequiredError = this.checkRequired("title", category.title);
    const titleTypeError = this.checkType(category.title, "string", "title");
    let parentIdTypeError: ValidateType | null;

    if (category.parentId) {
      parentIdTypeError = this.checkType(
        category.parentId,
        "string",
        "parentId"
      );
      if (parentIdTypeError) errors.push(parentIdTypeError);
    }

    if (titleRequiredError) errors.push(titleRequiredError);
    if (titleTypeError) errors.push(titleTypeError);

    return errors.length > 0 ? errors : null;
  }

  validateBasicProduct(product: IncomingProductData) {
    const errors: (RequiredResponse | ValidateType)[] = [];

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
      if (requiredError) errors.push(requiredError);

      const typeError = this.checkType(value, type, field);
      if (typeError) errors.push(typeError);
    });

    // Return errors if any, otherwise null
    return errors.length > 0 ? errors : null;
  }

  validateProductDetails(
    productDetails: IncomingProductData,
    productType: string
  ) {
    const errors: (RequiredResponse | ValidateType)[] = [];

    switch (productType) {
      case "toy":
        const validateToysRules = [
          {
            field: "size",
            value: productDetails.toyDetails?.size,
            type: "string",
          },
          {
            field: "recommendedAge",
            value: productDetails.toyDetails?.recommendedAge,
            type: "string",
          },
          {
            field: "sound",
            value: productDetails.toyDetails?.sound,
            type: "boolean",
          },
        ];
        validateToysRules.forEach(({ field, value, type }) => {
          const requiredError = this.checkRequired(field, value);
          if (requiredError) errors.push(requiredError);

          const typeError = this.checkType(value, type, field);
          if (typeError) errors.push(typeError);
        });
        return errors.length > 0 ? errors : null;
      case "accessory":
        const validateAccessoriesRules = [
          {
            field: "color",
            value: productDetails.accessoryDetails?.color,
            type: "string",
          },
          {
            field: "size",
            value: productDetails.accessoryDetails?.size,
            type: "string",
          },
          {
            field: "age",
            value: productDetails.accessoryDetails?.age,
            type: "string",
          },
        ];
        validateAccessoriesRules.forEach(({ field, value, type }) => {
          const requiredError = this.checkRequired(field, value);
          if (requiredError) errors.push(requiredError);

          const typeError = this.checkType(value, type, field);
          if (typeError) errors.push(typeError);
        });
        return errors.length > 0 ? errors : null;
      case "meal":
        const validateMealRules = [
          {
            field: "weight",
            value: productDetails.mealDetails?.weight,
            type: "string",
          },
          {
            field: "aroma",
            value: productDetails.mealDetails?.aroma,
            type: "string",
          },
          {
            field: "bleed",
            value: productDetails.mealDetails?.bleed,
            type: "string",
          },
          {
            field: "age",
            value: productDetails.mealDetails?.age,
            type: "string",
          },
        ];

        validateMealRules.forEach(({ field, value, type }) => {
          const requiredError = this.checkRequired(field, value);
          if (requiredError) errors.push(requiredError);

          const typeError = this.checkType(value, type, field);
          if (typeError) errors.push(typeError);
        });

        return errors.length > 0 ? errors : null;
      case "self care":
        const validateSeltCareRules = [
          {
            field: "weight",
            value: productDetails.selfCareDetails?.weight,
            type: "string",
          },
          {
            field: "aroma",
            value: productDetails.selfCareDetails?.aroma,
            type: "string",
          },
          {
            field: "age",
            value: productDetails.selfCareDetails?.age,
            type: "string",
          },
        ];

        validateSeltCareRules.forEach(({ field, value, type }) => {
          const requiredError = this.checkRequired(field, value);
          if (requiredError) errors.push(requiredError);

          const typeError = this.checkType(value, type, field);
          if (typeError) errors.push(typeError);
        });

        return errors.length > 0 ? errors : null;
    }
  }

  validateShipping(shipping: IncomingLoginData) {
    const errors: (RequiredResponse | ValidateType)[] = [];

    const validateRules = [
      { field: "username", value: shipping.username, type: "string" },
      { field: "password", value: shipping.password, type: "string" },
    ];

    validateRules.forEach(({ field, value, type }) => {
      const requiredError = this.checkRequired(field, value);
      if (requiredError) errors.push(requiredError);

      const typeError = this.checkType(value, type, field);
      if (typeError) errors.push(typeError);
    });

    return errors.length > 0 ? errors : null;
  }
}

export default ValidateIncomingData;
