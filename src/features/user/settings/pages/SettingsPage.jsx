import AvailabilitySection from "../components/AvailabilitySection";
import ScheduleSettingsSection from "../components/ScheduleSettingsSection";
import NavBarMain from "../../../../components/layout/NavBarMain";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <NavBarMain />
      <h1 className="text-xl font-semibold text-white">Configuración</h1>

      <AvailabilitySection />
      <ScheduleSettingsSection />
    </div>
  );
}
