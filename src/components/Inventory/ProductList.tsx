import React, { useState } from 'react';
import { Product } from '../../../types/product';
import ProductListItem from './ProductsListItem';

type ProductListProps = {
    products: Product[];
    handleUpdate: (updatedProduct: Product) => void;
    handleDelete: (productID: string) => void;
};

export default function ProductList({ products, handleUpdate, handleDelete }: ProductListProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleEdit = (productId: string) => {
        setActiveId(productId);
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Products:</h2>
            <ul className="w-full border border-collapse">
                {products.map((product) => (
                    <ProductListItem
                        key={product._id}
                        id={product._id}
                        product={product}
                        isEditing={product._id === activeId}
                        changeEdited={handleEdit}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
}
