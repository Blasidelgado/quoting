import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Product } from '../../../types/product';

type ProductFormProps = {
    products: Product[];
    onSubmit: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function ProductForm({ products, onSubmit } : ProductFormProps) {
    const [formData, setFormData] = useState<Product>({
            productName: "",
            stock: 0,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Make API call to create product using formData
            const res = await fetch("/api/products/add_product", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const response = await res.json();

            // Update products state
            if (response.success) {
                const newProduct = response.newProduct;
                onSubmit([
                    ...products,
                    newProduct
                ])
            };

            // Empty form fields
            setFormData({
                productName: "",
                stock: 0
            });
        } catch (error) {
            console.error("Error creating product: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-2">
                <label htmlFor="productName-input" className="block text-sm font-medium leading-6 text-gray-900">
                    Product name
                </label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="productName-input"
                    type="text" 
                    name="productName" 
                    value={formData.productName} 
                    onChange={(e) => handleInputChange(e)} 
                />
            </div>
            <div className="mt-2">
                <label htmlFor="stock-input" className="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                </label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="stock-input"
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="mt-2">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add
                </button>
            </div>
        </form>
    )
};