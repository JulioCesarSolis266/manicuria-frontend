const FooterAdmin = () => {
  return (
    <aside className="hidden xl:flex flex-col w-72 bg-gray-600 text-slate-300 border-l border-slate-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Soporte del Sistema
      </h2>

      <p className="text-sm mb-6">
        ¿Necesitás ayuda, mantenimiento o agregar nuevas funciones al sistema?
      </p>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-slate-400">Email</p>
          <p className="text-white">soporte@tusistema.com</p>
        </div>

        <div>
          <p className="text-slate-400">WhatsApp</p>
          <p className="text-white">+54 9 11 0000-0000</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-white font-medium mb-2">Servicios</h3>
        <ul className="text-sm space-y-1 text-slate-400">
          <li>• Nuevas funcionalidades</li>
          <li>• Reportes y estadísticas</li>
          <li>• Integración con pagos</li>
          <li>• Backups y seguridad</li>
        </ul>
      </div>

      <div className="mt-auto pt-6 text-xs text-slate-500 border-t border-slate-800">
        Sistema de Turnos © {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default FooterAdmin;
