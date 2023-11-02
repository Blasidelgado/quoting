import { useEffect, useState } from "react";
import axios from "axios";
import { ClientForm, ClientList } from "@/components/Clients";

export default function ClientPage() {
  const [clients, setClients] = useState([]);

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

  return (
    <div>
        <h1 className="mb-5">Clients</h1>
        <h2 className="mb-5">Add Client</h2>
        <ClientForm clients={clients} onSubmit={setClients}/>
        <ClientList clients={clients} />
    </div>
  );
};
