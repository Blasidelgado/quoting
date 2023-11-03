import React, { useState } from "react";
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Client } from "../../../types/client";
import axios from "axios";

type ClientListItemProps = {
    id: string;
    client: Client;
    handleUpdate: (updatedClient: Client) => void;
    handleDelete: (clientID: string) => void;
};


export default function ClientListItem({ id, client, handleUpdate, handleDelete }: ClientListItemProps) {
    const [originalClient, setOriginalClient] = useState<Client>(client);
    const [editedClient, setEditedClient] = useState<Client>(client);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSave = async () => {
        try {
            // Send a PUT request to update the client data in the database
            await axios.put(`/api/clients/update_client?id=${id}`, editedClient);

            // Update the original client data and exit edit mode
            setOriginalClient(editedClient);
            setIsEditing(false);
            
            // Notify the parent component about the update
            handleUpdate(editedClient);
        } catch (error) {
            setIsEditing(false);
            console.error('Error updating client:', error);
        }
    };


    const handleCancel = () => {
        // Reset editedClient to the original client data
        setEditedClient(originalClient);
        setIsEditing(false);
    }

    const handleDeletion = async (client: Client) => {
        const confirm = window.confirm(`Estas seguro que queres borrar al cliente ${client.clientName}?`)
        if (confirm) {
            try {
                await axios.delete(`/api/clients/delete_client?id=${id}`);

            // Notify the parent component about the deletion
            handleDelete(id);

            } catch (error) {
                console.error('Error deleting client:', error);
            }
            handleDelete(id);
        }
    }

    if (isEditing) {
        return (
            <li id={id}>
                <input
                    id="editClientName"
                    name="clientName" 
                    type="text" 
                    value={editedClient.clientName}
                    onChange={handleInputChange}
                />
                <input
                    id="editCUIT"
                    name="CUIT" 
                    type="text" 
                    value={editedClient.CUIT}
                    onChange={handleInputChange}
                />
                <input 
                    id="editAddress"
                    name="address" 
                    type="text" 
                    value={editedClient.address}
                    onChange={handleInputChange}
                />
                <input 
                    id="editCondicionIVA"
                    name="condicionIVA" 
                    type="text" 
                    value={editedClient.condicionIVA}
                    onChange={handleInputChange}
                />
                <FaSave
                    className="save-button mx-3 cursor-pointer inline-block"
                    onClick={handleSave}
                />
                <FaTimesCircle
                    className="mx-3 cursor-pointer inline-block"
                    onClick={handleCancel}
                />
            </li>
        );
    }

    return (
        <li id={id}>
            <span className="client-name mx-3">{originalClient.clientName}</span>
            <span className="client-CUIT mx-3">{originalClient.CUIT}</span>
            <span className="client-address mx-3">{originalClient.address}</span>
            <span className="client-condicionIVA mx-3">{originalClient.condicionIVA}</span>
            <span className="mx-3 cursor-pointer inline-block">
                <FaEdit 
                    className="edit-button mx-3 cursor-pointer"
                    onClick={() => {
                        setIsEditing(true);
                    }}
                />
            </span>
            <span className="mx-3 cursor-pointer inline-block">
                <FaTrash 
                    className="delete-button mx-3 cursor-pointer"
                    onClick={() => {
                        handleDeletion(client)
                    }}
                />
            </span>
        </li>
    );
};
