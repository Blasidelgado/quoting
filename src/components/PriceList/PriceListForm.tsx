import React, { useState } from 'react';

export default function PriceListForm({ products }) {

    const [priceListName, setPriceListName] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();

        const formattedPrices = products.map(product => {
            return {
                productId: product._id,
                price: parseFloat(parseFloat(event.target[`${product._id}-price`].value).toFixed(2))
            }
        })

        try {
            const response = await fetch('/api/price_lists/add_price_list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceListName,
                    prices: formattedPrices,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Price list created successfully:', data.newList);
                // Optionally: Redirect or perform any actions upon successful creation
            } else {
                console.error('Failed to create price list:', data.error);
                // Optionally: Handle error messages or show them to the user
            }
        } catch (error) {
            console.error('Error creating price list:', error);
            // Handle network-related errors or internal server errors
        }
    }

    return (
        <form className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Crear nueva lista:</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Nombre de la lista:</label>
                <input id='list-name' type='text' name='priceListName' className="mt-1 p-2 w-full border rounded"
                    onChange={(e) => setPriceListName(e.target.value)}
                 />
            </div>

            {products.map((product) => (
                <div key={product._id} className="mb-4">
                    <label
                        htmlFor={`${product._id}-price`}
                        className="block text-sm font-medium text-gray-600"
                    >
                        {product.productName}
                    </label>
                    <input
                        id={`${product._id}-price`}
                        type='text'
                        name={`${product._id}-price`}
                        defaultValue={0}
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
            ))}

            <div>
                <button type='submit' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Crear nueva lista
                </button>
            </div>
        </form>
    );
}
