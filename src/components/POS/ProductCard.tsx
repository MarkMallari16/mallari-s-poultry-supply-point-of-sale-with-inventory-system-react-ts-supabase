import { PawPrint } from "lucide-react";

interface Product {
    id: number;
    publicUrl: string;
    name: string;
    price: number;
}
interface ProductCardProps {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div key={product.id} className="flex flex-col justify-between card bg-base-100 w-full shadow-sm cursor-pointer">
            <figure className="h-60 object-cover overflow-hidden flex items-center justify-center bg-gray-100">
                {product.publicUrl ?
                    <img
                        src={product.publicUrl} />
                    : <PawPrint className="size-40 text-gray-500" />}
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{product.name}</h2>
                <p className="font-bold text-lg">₱{product.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-success w-full">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard