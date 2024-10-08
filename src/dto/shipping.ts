interface DelivertTimeType {
  workingHrs: string;
  weekendHrs: string;
}

interface IncomingShippingData {
  phone: string;
  deliveryTime: DelivertTimeType;
}

interface ShippingDetailsDocs extends IncomingShippingData {
  _id: string;
  createdAt: Date;
}
