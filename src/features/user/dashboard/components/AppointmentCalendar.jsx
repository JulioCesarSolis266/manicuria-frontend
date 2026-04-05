import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: es }),
  getDay,
  locales,
});

export default function AppointmentCalendar({ appointments }) {
  const navigate = useNavigate();

  // ✅ CONTROL DE ESTADO
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  const events = appointments.map((a) => {
    const start = new Date(a.date);
    const duration = a.service?.durationMinutes || 60;

    const end = new Date(start.getTime() + duration * 60000);

    return {
      id: a.id,
      title: `${a.client?.name || ""} ${a.client?.surname || ""} - ${
        a.service?.name || ""
      }`,
      start,
      end,
      resource: a,
    };
  });

  const handleSelectEvent = (event) => {
    navigate(`/edit-appointment/${event.id}`);
  };

  const handleSelectSlot = (slotInfo) => {
    const date = slotInfo.start.toISOString();
    navigate(`/create-appointment?date=${date}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Calendar
        localizer={localizer}
        culture="es"
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        // ✅ CONTROLADOS
        date={currentDate}
        view={currentView}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => setCurrentView(view)}
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
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
