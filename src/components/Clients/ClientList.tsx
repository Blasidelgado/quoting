import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Client } from '../../../types/client';
import ClientListItem from './ClientListItem';

type ClientListProps = {
    clients: Client[];
};

export default function ClientList({ clients }: ClientListProps) {
    return (
        <>
            <h2 className='mt-6'>Clients:</h2>
            <ul className="mb-3">
                {clients.map((client) => (
                <div key={client._id}>
                    <ClientListItem client={client}/>
                    <hr />
                </div>
                ))}
            </ul>
        </>
    );
};
