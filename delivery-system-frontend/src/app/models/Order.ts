export interface Order {
  id: string;
  customerId: string;
  driverId?: string;
  packageType: string;
  packageWeight: string;
  amount: number;
  pickupAddress: string;
  pickupPincode: number;
  deliveryAddress: string;
  orderStatus: string;
  placedTime: Date;
  deliveryTime?: Date;
  }
  