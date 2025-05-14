const ProductModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                {/* Form Fields */}
                <form className="space-y-4">
                    <input type="text" placeholder="Product Name" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Category" className="w-full p-2 border rounded" />
                    <input type="number" placeholder="Quantity" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Cost Price / Selling Price" className="w-full p-2 border rounded" />
                    <select className="w-full p-2 border rounded">
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Archived">Archived</option>
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-[#0B2B50] text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
