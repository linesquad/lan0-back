import { RequiredResponse, ValidateType } from "../dto/validateResponse";

class validateIncomingData {
  private checkRequired(field: string, value: string): RequiredResponse | null {
    if (!value) return { field, value: `The field ${field} is required` };
    return null;
  }

  private checkType(
    value: any,
    type: string,
    field: string
  ): ValidateType | null {
    if (value !== type) {
      return {
        received: value,
        expected: type,
        value: `The field ${field} must be of type ${type}`,
      };
    }

    return null;
  }
}

export default validateIncomingData;
