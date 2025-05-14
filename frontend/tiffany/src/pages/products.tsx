import { useState } from "react";
import ProductModal from "./product_modal"; // Adjust the path if needed

const Product = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Product</h1>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-[#0B2B50] text-white">
                            <th className="px-4 py-2 border">Product Name, SKU</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Quantity</th>
                            <th className="px-4 py-2 border">Cost Price/Selling Price</th>
                            <th className="px-4 py-2 border">Status (Active/Archived)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(6)].map((_, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 border"></td>
                                <td className="px-4 py-2 border"></td>
                                <td className="px-4 py-2 border"></td>
                                <td className="px-4 py-2 border"></td>
                                <td className="px-4 py-2 border"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#0B2B50] text-white font-semibold px-6 py-2 rounded hover:bg-[#133b6a] shadow"
                >
                    Add
                </button>
            </div>

            {/* Product Modal */}
            {showModal && <ProductModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Product;
