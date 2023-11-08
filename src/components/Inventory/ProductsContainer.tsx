import React, { useState } from 'react';
import { Product } from '../../../types/product';
import ProductSelect from './ProductSelect';
import ProductCard from './ProductCard';
import ProductsTable from './ProductsTable';

type ProductsContainerProps = {
    products: Product[];
    handleUpdate: (updatedProduct: Product) => void;
    handleDelete: (id: string) => void
};

const ProductsContainer: React.FC<ProductsContainerProps> = ({ products, handleUpdate, handleDelete }) => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const handleSelect = (productId: string) => {
        setSelectedProductId(productId);
    };

    const selectedProduct = products.find((product) => product._id === selectedProductId) || null;
    console.log(selectedProduct);
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Products:</h2>
            <div className="md:hidden">
                <ProductSelect products={products} onSelect={handleSelect} />
                {selectedProduct ? (
                    <ProductCard
                        product={selectedProduct}
                        onEdit={handleUpdate}
                        onDelete={handleDelete}
                    />
                ) : null}
            </div>
            <div className="hidden md:block">
                <ProductsTable
                    products={products}
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default ProductsContainer;
