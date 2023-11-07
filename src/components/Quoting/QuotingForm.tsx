import React, { useState } from "react";
import { parseISO, format } from 'date-fns';

export default function QuotingForm({ clients, onSubmit }) {
    const [newQuoting, setNewQuoting] = useState({
        date: "",
        number: 0,
        client: "",
    });

    function handleChange(target) {
        if (target.name === "date") {
            const selectedDate = parseISO(target.value);
            const formattedDate = format(selectedDate, "dd-MM-yyyy");
            setNewQuoting({
                ...newQuoting,
                date: formattedDate,
            });
        } else {
            setNewQuoting({
                ...newQuoting,
                [target.name]: target.value,
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(newQuoting);
    }

    if (clients.length) {
        return (
            <form className="max-w-lg mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Quoting</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Quoting Date:</label>
                    <input
                        type="date"
                        name="date"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={(e) => handleChange(e.target)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Quoting Number:</label>
                    <input
                        type="text"
                        name="number"
                        value={newQuoting.number}
                        onChange={(e) => handleChange(e.target)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Client:</label>
                    <select
                        defaultValue={newQuoting.client}
                        name="client"
                        onChange={(e) => handleChange(e.target)}
                        className="mt-1 p-2 border rounded w-full"
                    >
                        <option value="" hidden disabled>
                            Select a Client
                        </option>
                        {clients.map((client) => {
                            return <option key={client._id} value={client._id}>{client.clientName}</option>;
                        })}
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                >
                    Submit
                </button>
            </form>
        );
    } else {
        return <p className="text-gray-700">Make sure you have at least 1 client registered.</p>;
    }
}
