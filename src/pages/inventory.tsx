import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import ProductForm from '@/components/Inventory/ProductsForm';
import axios from 'axios';
import ProductListItem from '@/components/Inventory/ProductsListItem';
import ProductList from '@/components/Inventory/ProductList';


export default function Inventory() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("/api/inventory/");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    },[]);

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
        <>
        <h1 className='my-6'>Inventory</h1>
        <ProductForm products={products} onSubmit={setProducts}/>
        <ProductList products={products} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </>
    )
}