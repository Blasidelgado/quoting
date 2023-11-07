import React from 'react';
import { Product } from '../../../types/product';

type ProductSelectProps = {
    products: Product[];
    onSelect: (productId: string) => void;
};

const ProductSelect: React.FC<ProductSelectProps> = ({ products, onSelect }) => {
    return (
        <select className="mb-4 block w-full p-2 border border-gray-300 rounded" onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select a product</option>
            {products.map((product) => (
                <option key={product._id} value={product._id}>
                    {product.productName}
                </option>
            ))}
        </select>
    );
};

export default ProductSelect;
