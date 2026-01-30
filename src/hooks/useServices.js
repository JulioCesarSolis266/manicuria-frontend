import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";  


export const useServices = () => {
  const { token } = useContext(AuthContext);
  const [services, setservices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState(null);

  useEffect(() => {
    const fetchservices = async () => {
      try {
        const res = await fetch(`${API_URL.SERVICES}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorServices(data.message || "Error loading services");
          return;
        }

        setservices(data.services || []);
      } catch (err) {
        setErrorServices("Network error loading services");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchservices();
  }, [token]);

  return { services, loadingServices, errorServices };
};