import React from 'react';
import { Client } from '../../../types/client';

type ClientSelectProps = {
    clients: Client[];
    onSelect: (clientId: string) => void;
};

const ClientSelect: React.FC<ClientSelectProps> = ({ clients, onSelect }) => {
    return (
        <select 
        className="mb-4 block w-full p-2 border border-gray-300 rounded" 
        onChange={(e) => onSelect(e.target.value)}
        >
            <option value="">Select a client</option>
            {clients.map((client) => (
                <option key={client._id} value={client._id}>
                    {client.clientName}
                </option>
            ))}
        </select>
    );
};

export default ClientSelect;
