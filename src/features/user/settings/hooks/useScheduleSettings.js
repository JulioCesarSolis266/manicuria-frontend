import { useEffect, useState } from "react";
import {
  getScheduleSettings,
  updateScheduleSettings,
} from "../api/scheduleSettings.api";

export function useScheduleSettings() {
  const [settings, setSettings] = useState({
    maxConcurrentAppointments: 1,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await getScheduleSettings();

    setSettings({
      maxConcurrentAppointments: res?.maxConcurrentAppointments ?? 1,
    });
  };

  const updateField = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = async () => {
    await updateScheduleSettings(settings);
  };

  return {
    settings,
    updateField,
    save,
  };
}
