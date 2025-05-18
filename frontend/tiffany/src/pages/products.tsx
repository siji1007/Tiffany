import { useEffect, useState } from "react";
import axios from "axios";


const Product = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/api/products")
            .then((res) => {
                setProducts(res.data);
                const initialQuantities = {};
                res.data.forEach((prod) => {
                    initialQuantities[prod.product_id] = 1;
                });
                setQuantities(initialQuantities);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    const handlePurchase = async (product) => {
        alert(`Selected Product ID: ${product.product_id}`);

        const qty = quantities[product.product_id];
        if (qty < 1 || qty > product.product_quantity) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/api/purchase", {
                product_id: product.product_id,
                quantity: qty,
            });

            alert(`✅ Purchase successful! Product ID: ${product.product_id} Quantity: ${qty}`);
                } catch (error) {
                    console.error("Purchase failed:", error.response?.data || error.message);
                    alert(`❌ Purchase failed. Please try again.\nError: ${error.response?.data?.error || error.message}`);
                }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">POINT OF SALE</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.product_id} className="bg-white rounded-lg shadow-md p-4">
                       <img
                        src={`/${product.product_image}`} // product.product_image = 'assets/Gin.jpg'
                        alt={product.product_name}
                        className="w-full h-40 object-cover rounded-md mb-4"
/>
                        <h2 className="text-lg font-semibold">{product.product_name}</h2>
                        <p className="text-sm text-gray-600">Price: ₱{product.product_price}</p>
                        <p className="text-sm text-gray-600">Available: {product.product_quantity}</p>
                        <input
                            type="number"
                            min={1}
                            max={product.product_quantity}
                            value={quantities[product.product_id] || 1}
                            onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))}
                            className="w-full mt-2 border rounded px-2 py-1"
                        />
                    <button onClick={() => handlePurchase(product)} className="bg-[#0B2B50] text-white font-semibold w-full mt-3 py-2 rounded hover:bg-[#133b6a]" > Purchase </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
