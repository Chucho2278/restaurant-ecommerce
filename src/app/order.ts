export interface Order {
  _id?: string; // El ID es opcional porque MongoDB lo genera automáticamente
  name: string;
  surname: string;
  phone: string;
  address?: string; // Opcional si es domicilio
  deliveryTime?: string; // Opcional si es domicilio
  pickupTime?: string; // Opcional si es recogida en restaurante
  email: string;
  paymentMethod: 'efectivo' | 'online';
  items: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}
