import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Client } from '../../../types/client';

type ClientFormProps = {
    clients: Client[];
    onSubmit: React.Dispatch<React.SetStateAction<Client[]>>;
};

export default function ClientForm({ clients, onSubmit } : ClientFormProps) {
    const [formData, setFormData] = useState<Client>({
            clientName: "",
            CUIT: "",
            address: "",
            condicionIVA: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Make API call to create client using formData
            const res = await fetch("/api/clients/", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const response = await res.json();

            // Update clients state
            if (response.success) {
                const newClient = response.newClient;
                onSubmit([
                    ...clients,
                    newClient
                ])
            }

            // Empty form fields
            setFormData({
                clientName: "",
                CUIT: "",
                address: "",
                condicionIVA: "",
            })
        } catch (error) {
            console.error("Error creating client: ", error);
        }
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: e.target.value,
        });
    };
        
    return (
        <form onSubmit={handleSubmit}>
                <div className="mt-2">
                <label htmlFor="clientName" className="block text-sm font-medium leading-6 text-gray-900">
                    Client name
                </label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="clientName"
                    type="text" 
                    name="clientName" 
                    value={formData.clientName} 
                    onChange={(e) => handleInputChange(e)} />
                </div>
            <div className="mt-2">
                <label htmlFor="CUIT" className="block text-sm font-medium leading-6 text-gray-900">
                    CUIT
                </label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="CUIT"
                    type="text"
                    name="CUIT"
                    value={formData.CUIT}
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="mt-2">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                </label>
                <input
                    id="address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="mt-2">
                <label htmlFor="condicionIVA" className="block text-sm font-medium leading-6 text-gray-900">
                    Condicion frente al IVA
                </label>
                <select
                    id="condicionIVA"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"                name="condicionIVA"
                    defaultValue={formData.condicionIVA}
                    onChange={(e) => handleInputChange(e)}>
                        <option value="" disabled hidden>Select a condition</option>
                        <option value="mono">Monotributista</option>
                        <option value="respInsc">Responsable Inscripto</option>
                </select>
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
    );
};
