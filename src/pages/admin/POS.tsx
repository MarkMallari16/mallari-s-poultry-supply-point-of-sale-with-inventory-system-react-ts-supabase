import { Banknote, Minus, Plus, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import type { ProductWithUrl } from "../../types/product"
import type { Category } from "../../types/categories";
import { getAllProducts } from "../../services/api/products";
import { getAllCategories } from "../../services/api/categories";
import GcashLogo from "../../assets/gcash.png";
import ProductCard from "../../components/POS/ProductCard";

const POS = () => {

    const [products, setProducts] = useState<ProductWithUrl[]>();
    const [categories, setCategories] = useState<Category[]>();

    const fetchProducts = async () => {
        const results = await getAllProducts();
        setProducts(results);
    }

    const fetchCategories = async () => {
        const results = await getAllCategories();
        setCategories(results);
        console.log(results);
    }
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    return (
        <>
            <div>
                <h1 className="text-xl font-bold">Category</h1>
                <div className="mt-2 flex gap-2">
                    {
                        categories?.map(category => (
                            <button key={category.id} className="btn">{category.name}</button>
                        ))
                    }
                </div>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_30%] gap-6">

                <div>

                    {/* <div className="mb-4 bg-white p-4 rounded-md border border-gray-300">
                        <label htmlFor="productSearch" className="text-gray-500">Search product</label>
                        <input type="text" id="productSearch" placeholder="Search Product Here..." className="input w-full " />
                    </div> */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {
                            products?.map(product => (
                                <ProductCard product={product} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className="bg-white p-5 rounded-md border border-gray-300 shadow-xs">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="text-emerald-500" />
                                <h2 className="text-xl font-medium">Cart (2)</h2>
                            </div>
                            <button className="btn cursor-pointer text-error font-medium bg-error/10 rounded-md">Clear All</button>
                        </div>

                        <div className="pt-6 overflow-y-auto h-96">
                            <div className="bg-gray-100 p-5 rounded-sm flex w-full gap-5">
                                <div className="w-20 object-cover">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGuYEGUgBZKz49g4JeSB-at0vRjW-B_sgLg&s" alt="product" />
                                </div>

                                <div className="w-full">
                                    <h3 className="text-lg font-medium">Product Name</h3>
                                    <p className="text-md">Category</p>

                                    <div className="flex justify-between gap-2 w-full">
                                        <p className="font-medium">$41</p>
                                        <div className="flex justify-between items-center gap-5">
                                            <button className="btn btn-circle cursor-pointer bg-white border border-gray-300">
                                                <Minus className="size-4" />
                                            </button>
                                            <p className="text-lg">2</p>
                                            <button className="btn btn-circle cursor-pointer bg-white border border-gray-300">
                                                <Plus className="size-4" />
                                            </button>
                                        </div>


                                    </div>
                                    <div className="flex justify-end pt-4 ">
                                        <h2 className="text-end  text-emerald-500 font-bold">$82</h2>
                                    </div>
                                </div>

                            </div>
                            <div className="bg-gray-100 p-5 rounded-sm flex w-full gap-5 mt-4">
                                <div className="w-20 object-cover">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGuYEGUgBZKz49g4JeSB-at0vRjW-B_sgLg&s" alt="product" />
                                </div>

                                <div className="w-full">
                                    <h3 className="text-lg font-medium">Product Name</h3>
                                    <p className="text-md">Category</p>

                                    <div className="flex justify-between gap-2 w-full">
                                        <p className="font-medium">$41</p>
                                        <div className="flex justify-between items-center gap-5">
                                            <button className="btn btn-circle cursor-pointer bg-white border border-gray-300">
                                                <Minus className="size-4" />
                                            </button>
                                            <p className="text-lg">2</p>
                                            <button className="btn btn-circle cursor-pointer bg-white border border-gray-300">
                                                <Plus className="size-4" />
                                            </button>
                                        </div>

                                    </div>
                                    <div className="flex justify-end pt-4 ">
                                        <h2 className="text-end  text-emerald-500 font-bold">$82</h2>
                                    </div>
                                </div>

                            </div>
                            <div className="bg-gray-100 p-5 rounded-sm flex w-full gap-5 mt-4">
                                <div className="w-20 object-cover">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGuYEGUgBZKz49g4JeSB-at0vRjW-B_sgLg&s" alt="product" />
                                </div>

                                <div className="w-full">
                                    <h3 className="text-lg font-medium">Product Name</h3>
                                    <p className="text-md">Category</p>

                                    <div className="flex justify-between gap-2 w-full">
                                        <p className="font-medium">$41</p>
                                        <div className="flex justify-between items-center gap-5">
                                            <button className="cursor-pointer bg-white p-2 rounded-full border border-gray-300">
                                                <Minus className="size-4" />
                                            </button>
                                            <p className="text-lg">2</p>
                                            <button className=" cursor-pointer bg-white p-2 rounded-full border border-gray-300">
                                                <Plus className="size-4" />
                                            </button>
                                        </div>


                                    </div>
                                    <div className="flex justify-end pt-4 ">
                                        <h2 className="text-end  text-emerald-500 font-bold">$82</h2>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <h3 className="font-medium text-xl">Total</h3>
                            <h1 className="text-2xl font-bold text-emerald-500">$292.24</h1>
                        </div>
                        <div>
                            <button className="btn btn-success w-full mt-4">
                                <Banknote />
                                Pay Cash
                            </button>
                            <button className="btn btn- w-full mt-3">
                                <img src={GcashLogo} alt="Gcash Logo" className="w-6" />
                                GCash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default POS