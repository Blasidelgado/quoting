import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import ProductForm from '@/components/Inventory/ProductsForm';


export default function Inventory() {

    const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {

    // });

    return (
        <>
        <h1 className='my-6'>Inventory</h1>
        <ProductForm products={products} onSubmit={setProducts}/>
        </>
    )
}