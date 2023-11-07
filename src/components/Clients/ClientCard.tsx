import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from "react-icons/fa";
import { Client } from "../../../types/client";

type ClientCardProps = {
  client: Client;
  onEdit: (clientId) => void;
  onDelete: (clientId) => void;
};

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
}) => {
  const [originalClient, setOriginalClient] = useState<Client>(client);
  const [editedClient, setEditedClient] = useState<Client>({ ...client });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setOriginalClient(client);
  }, [client]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/clients/${client?._id}`, editedClient);
      setOriginalClient(editedClient);
      onEdit(editedClient);
      setIsEditing(false);
    } catch (error) {
      console.error("Could not update", error);
    }
  };

  const handleCancel = () => {
    setEditedClient(originalClient);
    setIsEditing(false);
  };

  const handleDeletion = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete the cleint: ${originalClient.clientName}?`
    );
    if (confirm) {
      try {
        await axios.delete(`/api/clients/${client?._id}`);
        onDelete(client?._id);
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  if (!client) {
    return null;
  }

    if (isEditing) {
        return (
                <div className="border p-4 rounded shadow">
                    <input
                    className="text-xl font-bold mb-2 border p-1 block"
                    id="editClientName"
                    name="clientName"
                    type="text"
                    value={editedClient.clientName}
                    onChange={handleInputChange}
                    />
                    <input
                    className="border p-1 mb-2 block"
                    id="editCUIT"
                    name="CUIT"
                    type="text"
                    value={editedClient.CUIT}
                    onChange={handleInputChange}
                    />
                    <input
                    className="border p-1 mb-2 block"
                    id="editAddress"
                    name="address"
                    type="text"
                    value={editedClient.address}
                    onChange={handleInputChange}
                    />
                    <input
                    className="border p-1 mb-2 block"
                    id="editCondicionIVA"
                    name="condicionIVA"
                    type="text"
                    value={editedClient.condicionIVA}
                    onChange={handleInputChange}
                    />
                <div className="flex space-x-2">
                    <FaSave
                    className="text-green-600 cursor-pointer text-4xl"
                    onClick={handleSave}
                    />
                    <FaTimesCircle
                    className="text-red-600 cursor-pointer text-4xl"
                    onClick={handleCancel}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{originalClient.clientName}</h3>
            <p className="text-gray-700 mb-4">CUIT: {originalClient.CUIT}</p>
            <p className="text-gray-700 mb-4">Address: {originalClient.address}</p>
            <p className="text-gray-700 mb-4">CondicionIVA: {originalClient.condicionIVA}</p>
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <FaEdit
                        className="text-green-600 cursor-pointer text-4xl"
                        onClick={() => setIsEditing(true)}
                    />
                    <FaTrash
                        className="text-red-600 cursor-pointer text-4xl"
                        onClick={handleDeletion}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClientCard;
