import React, { useState } from 'react';
import { Product } from '../../../types/product';
import ProductListItem from './ProductsListItem';

type ClientListProps = {
    products: Product[];
    handleUpdate: (updatedClient: Product) => void;
    handleDelete: (productID: string) => void;
};

export default function ProductList({ products, handleUpdate, handleDelete }: ClientListProps) {

    const [activeId, setActiveId] = useState(null);

    const handleEdit = (productId) => {
        setActiveId(productId);
    }

    return (
        <>
            <h2 className='mt-6'>Clients:</h2>
            <ul className="mb-3">
                {products.map((product, index) => (
                    <div key={product._id} className='product-item'>
                        <ProductListItem 
                            id={product._id || index.toString()} 
                            product={product}
                            isEditing={product._id === activeId}
                            changeEdited={handleEdit}
                            handleUpdate={handleUpdate} 
                            handleDelete={handleDelete} />
                        <hr />
                    </div>
                ))}
            </ul>
        </>
    );
};