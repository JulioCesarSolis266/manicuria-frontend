import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavBarMain from "../../components/NavBarMain";
import { useClients } from "../../hooks/useClients";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { clients, loadingClients, errorClients } = useClients();

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("Clients loaded in form:", clients);

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = { service, date, clientId };

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Appointment created successfully");
        navigate("/dashboard-manicura");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error creating appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarMain />
      <div style={{ padding: "20px" }}>
        <h1>Create Appointment</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "400px",
          }}
        >
          {/* Service */}
          <div>
            <label>Service</label>
            <input
              type="text"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Detalle del servicio"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Date */}
          <div>
            <label>Date & Time</label>
            <input
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Client */}
          <div>
            <label>Client</label>

            {loadingClients && <p>Loading clients...</p>}
            {errorClients && <p style={{ color: "red" }}>Error: {errorClients}</p>}

            {!loadingClients && !errorClients && (
              <select
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Saving..." : "Create Appointment"}
          </button>
        </form>
      </div>
    </>
  );
}
