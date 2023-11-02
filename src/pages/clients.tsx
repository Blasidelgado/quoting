// pages/client.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ClientForm from "@/components/Clients/ClientForm";
import ClientList from "@/components/Clients/ClientList";
import { Client } from "../../types/client";

export default function ClientPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get("/api/clients");
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
    <div>
        <h1 className="mb-5">Clients</h1>
        <h2 className="mb-5">Add Client</h2>
        <ClientForm clients={clients} onSubmit={setClients} />
        <ClientList clients={clients} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  );
}
