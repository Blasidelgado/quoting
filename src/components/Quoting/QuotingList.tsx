import React from "react";

export default function QuotingList({ quotings, products, priceLists, clients, onComplete, onDelete }) {

    const findUsedList = quoting => {
        const usedPriceList = priceLists.find(list => list._id === quoting.priceList).priceListName
        return usedPriceList ? usedPriceList : 'Lista eliminada'
    }

    const findUsedClient = quoting => {
        return clients.find(client => client._id === quoting.client).clientName
    }

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quotings.map(quoting => (
                <div key={quoting._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">{quoting.number}</h3>
                    <p className="text-gray-500 mb-2">{quoting.date}</p>
                    <p className="text-gray-700 mb-4">{findUsedClient(quoting)}</p>
                    <p className="text-gray-700 mb-4">{findUsedList(quoting)}</p>
                    <ul>
                        {quoting.concepts.map(concept => {
                            const productName = products.find(product => product._id === concept.product)?.productName;
                            return (
                                <li key={concept._id} className="flex justify-between">
                                    <span>{productName}</span>
                                    <span>{concept.quantity} kg.</span>
                                    <span>${concept.subtotal.toFixed(2)}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="text-blue-500">${quoting.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-around py-5 yx-2">
                        <button 
                        type="button"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                        onClick={() => onComplete(quoting._id)}
                        >
                            Complete
                        </button>
                        <button 
                        type="button"
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                        onClick={() => onDelete(quoting._id)} 
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}
