import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState(null);

  const fetchClients = async () => {
    try {
      setLoadingClients(true);

      const res = await fetchWithAuth(API_URL.CLIENTS);
      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al cargar clientes");
      }

      setClients(data.clients || []);
    } catch (err) {
      setErrorClients(err.message);
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    setClients,
    loadingClients,
    errorClients,
    refetchClients: fetchClients,
  };
};
