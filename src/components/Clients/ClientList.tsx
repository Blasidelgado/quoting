import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Client } from '../../../types/client';
import ClientListItem from './ClientListItem';

type ClientListProps = {
    clients: Client[];
    handleUpdate: (updatedClient: Client) => void;
    handleDelete: (clientID: string) => void;
};

export default function ClientList({ clients, handleUpdate, handleDelete }: ClientListProps) {
    return (
        <>
            <h2 className='mt-6'>Clients:</h2>
            <ul className="mb-3">
                {clients.map((client) => (
                    <div key={client._id} className='client-item'>
                        <ClientListItem id={client._id} client={client} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                        <hr />
                    </div>
                ))}
            </ul>
        </>
    );
};
