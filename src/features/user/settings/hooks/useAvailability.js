import { useEffect, useState } from "react";
import { getAvailability, updateAvailability } from "../api/availability.api";
import { DAYS } from "../utils/days";

function normalize(data) {
  return DAYS.map((day) => {
    const found = data.find((d) => d.dayOfWeek === day.value);

    return {
      dayOfWeek: day.value,
      label: day.label,
      isActive: found?.isActive ?? false,
      startTime: found?.startTime ?? "08:00",
      endTime: found?.endTime ?? "20:00",
    };
  });
}

export function useAvailability() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await getAvailability();

      console.log("Respuesta cruda availability:", res);
      console.log("Es array:", Array.isArray(res));
      setData(normalize(res || []));
    } finally {
      setLoading(false);
    }
  };

  const updateDay = (index, changes) => {
    const updated = [...data];
    updated[index] = { ...updated[index], ...changes };
    setData(updated);
  };

  const save = async () => {
    const payload = data.map((d) => ({
      dayOfWeek: d.dayOfWeek,
      startTime: d.startTime,
      endTime: d.endTime,
      isActive: d.isActive,
    }));

    await updateAvailability(payload);
  };

  return {
    data,
    loading,
    updateDay,
    save,
  };
}
