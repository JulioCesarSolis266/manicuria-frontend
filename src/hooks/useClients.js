import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useClients = () => {
  const { token } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorClients(data.message || "Error loading clients");
          return;
        }

        setClients(data.clients || []);
      } catch (err) {
        setErrorClients("Network error loading clients");
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, [token]);

  return { clients, loadingClients, errorClients };
};
