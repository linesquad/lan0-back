interface RequiredResponse {
  field: string;
  value: string | null;
}

interface ValidateType {
  value: string;
  expected: any;
  received: any;
}

export { RequiredResponse, ValidateType };
