import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Client } from '../../../types/client';
import ClientListItem from './ClientListItem';

type ClientListProps = {
    clients: Client[];
    handleUpdate: (updatedClient: Client) => void
};

export default function ClientList({ clients, handleUpdate }: ClientListProps) {
    return (
        <>
            <h2 className='mt-6'>Clients:</h2>
            <ul className="mb-3">
                {clients.map((client) => (
                    <div key={client._id}>
                        <ClientListItem id={client._id} client={client} handleUpdate={handleUpdate}/>
                        <hr />
                    </div>
                ))}
            </ul>
        </>
    );
};
