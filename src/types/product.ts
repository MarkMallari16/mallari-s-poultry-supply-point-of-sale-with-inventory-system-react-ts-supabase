export type Product = {
    id: number,
    name: string,
    brand: string,
    price: number,
    stock: number,
    unit: string,
    created_at: string
    image_url: string
    category_id?: number
}
export type ProductWithUrl = Product & {
    publicUrl: string;
}