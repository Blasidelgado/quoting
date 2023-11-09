import React, { useState, useEffect } from 'react';
import ProductForm from '@/components/Inventory/ProductsForm';
import axios from 'axios';
import ProductsContainer from '@/components/Inventory/ProductsContainer';
import { Product } from '../../types/product';


export default function Inventory() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get<Product[]>("/api/inventory/");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    function handleUpdate(updatedProduct: Product) {
        setProducts(products.map(product => {
            if (product._id === updatedProduct._id) {
                return updatedProduct;
            } else {
                return product;
            }
        }));
    }

    function handleDelete(productID: string) {
        setProducts(products.filter(product => product._id !== productID));
    }

    return (
        <div className="my-6">
            <h1 className='text-3xl font-bold mb-6'>Inventory</h1>
            <ProductForm products={products} onSubmit={setProducts} />
            <ProductsContainer products={products} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </div>
    );
}
