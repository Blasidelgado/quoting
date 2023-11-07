import React, { useState } from 'react';
import ClientSelect from './ClientSelect';
import ClientCard from './ClientCard';
import { Client } from '../../../types/client';

type ClientsContainerProps = {
    clients: Client[];
    handleUpdate: (id: string) => void;
    handleDelete: (id: string) => void
};

const ClientsContainer: React.FC<ClientsContainerProps> = ({ clients, handleUpdate, handleDelete }) => {
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    const handleSelect = (clientId: string) => {
        setSelectedClientId(clientId);
    };

    const selectedClient = clients.find((client) => client._id === selectedClientId) || null;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Clients:</h2>
            <div>
                <ClientSelect clients={clients} onSelect={handleSelect} />
                {selectedClient ? (
                    <ClientCard
                        client={selectedClient}
                        onEdit={handleUpdate}
                        onDelete={handleDelete}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default ClientsContainer;
