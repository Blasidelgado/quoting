import React from "react";

export default function QuotingList({ quotings, products }) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quotings.map(quoting => (
                <div key={quoting._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">{quoting.number}</h3>
                    <p className="text-gray-500 mb-2">{quoting.date}</p>
                    <p className="text-gray-700 mb-4">{quoting.client}</p>
                    <ul>
                        {quoting.concepts.map(concept => {
                            const productName = products.find(product => product._id === concept.product)?.productName;
                            return (
                                <li key={concept._id} className="flex justify-between">
                                    <span>{productName}</span>
                                    <span>${concept.subtotal.toFixed(2)}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="text-blue-500">${quoting.total.toFixed(2)}</span>
                    </div>
                </div>
            ))}
        </section>
    );
}
