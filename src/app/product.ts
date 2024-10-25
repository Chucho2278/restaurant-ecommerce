export interface Product {
  _id?: string; // Asegúrate de incluir el campo _id
  id?: number; // Añadir la propiedad id para mantener la compatibilidad
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}
