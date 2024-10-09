interface RequiredResponse {
  field: string;
  value: string | null;
}

interface ValidateType {
  message: string;
  expected: any;
  received: any;
}

export { RequiredResponse, ValidateType };
