interface IncomingLoginData {
  username: string;
  password: string;
}

interface ShippingDetailsDocs extends IncomingLoginData {
  _id: string;
  createdAt: Date;
}
