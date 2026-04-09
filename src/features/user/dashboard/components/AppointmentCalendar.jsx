import { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: es }),
  getDay,
  locales,
});

// 🔹 constantes fuera (evita recreación)
const STATUS_COLORS = {
  confirmed: "#16a34a",
  pending: "#f59e0b",
  cancelled: "#ef4444",
  default: "#3b82f6",
};

// 🔹 componente fuera
const EventComponent = ({ event }) => {
  return (
    <div className="text-xs leading-tight">
      <p className="font-semibold truncate">{event.resource.client?.name}</p>
      <p className="opacity-90 truncate">{event.resource.service?.name}</p>
    </div>
  );
};

// 🔹 toolbar fuera
const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  const views = ["month", "week", "day", "agenda"];

  const viewLabels = {
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div className="flex gap-2">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ←
        </button>

        <button
          onClick={() => onNavigate("TODAY")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Hoy
        </button>

        <button
          onClick={() => onNavigate("NEXT")}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          →
        </button>
      </div>

      <span className="font-semibold text-gray-700 text-center">{label}</span>

      <div className="flex gap-2 justify-center md:justify-end">
        {views.map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`px-3 py-1 rounded transition ${
              view === v
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {viewLabels[v]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function AppointmentCalendar({ appointments }) {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  // 🔹 memoizado
  const events = useMemo(() => {
    return appointments.map((a) => {
      const start = new Date(a.date);
      const duration = a.service?.durationMinutes || 60;
      const end = new Date(start.getTime() + duration * 60000);

      return {
        id: a.id,
        title: `${a.client?.name || ""} ${a.client?.surname || ""}`,
        start,
        end,
        resource: a,
      };
    });
  }, [appointments]);

  const eventStyleGetter = (event) => {
    const status = event.resource?.status;
    const backgroundColor = STATUS_COLORS[status] || STATUS_COLORS.default;

    return {
      style: {
        backgroundColor,
        borderRadius: "10px",
        color: "white",
        border: "none",
        padding: "4px",
        fontSize: "12px",
      },
    };
  };

  const handleSelectEvent = (event) => {
    navigate(`/edit-appointment/${event.id}`);
  };

  // 🔹 FIX timezone (sin toISOString)
  const handleSelectSlot = (slotInfo) => {
    navigate(`/create-appointment`, {
      state: { date: slotInfo.start },
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border">
      <Calendar
        localizer={localizer}
        culture="es"
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        onView={setCurrentView}
        style={{ height: 650 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent,
          toolbar: CustomToolbar,
        }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Turno",
          noEventsInRange: "No hay turnos en este rango",
        }}
      />
    </div>
  );
}
