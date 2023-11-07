import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientForm from "@/components/Clients/ClientForm";
import ClientList from "@/components/Clients/ClientList";
import { Client } from "../../types/client";
import ClientsContainer from "@/components/Clients/ClientsContainer";

export default function ClientPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get<Client[]>("/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }

    fetchClients();
  }, []);

  function handleUpdate(updatedClient: Client) {
    setClients(clients.map(client => {
      if (client._id === updatedClient._id) {
        return updatedClient;
      } else {
        return client;
      }
    }));
  }

  function handleDelete(clientID: string) {
    setClients(clients.filter(client => client._id !== clientID));
  }

  return (
    <div className="my-6">
      <h1 className='text-3xl font-bold mb-6'>Clients</h1>
      <ClientForm clients={clients} onSubmit={setClients} />
      <ClientsContainer clients={clients} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  );
}
