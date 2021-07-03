export default interface ICreateCCSProductDTO {
  stock: number;
  sku: string;
  size_product_id: string;

  color_id: string;
  user_id: string;
  product_id: string;

  thumbnail?: string;
  bar_code?: string;
}
