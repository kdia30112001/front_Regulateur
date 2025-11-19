import { LayoutDashboard, Users, Bus, History, Settings, User, LogOut, Route, MapPin, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'users' | 'bus' | 'itineraires' | 'suivi' | 'incidents' | 'trajets' | 'historique' | 'profile') => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Utilisateurs' },
    { id: 'bus', icon: Bus, label: 'Bus & Chauffeurs' },
    { id: 'itineraires', icon: Route, label: 'Itinéraires & Lignes' },
    { id: 'suivi', icon: MapPin, label: 'Suivi Temps Réel' },
    { id: 'incidents', icon: AlertTriangle, label: 'Incidents & Alertes' },
    { id: 'historique', icon: History, label: 'Rapports & Stats' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center shadow-md">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[#1A1A1A] font-bold">YoonuBus Bi</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#007BFF] text-white shadow-lg shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#007BFF]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#007BFF] rounded-xl transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Paramètres</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            currentPage === 'profile'
              ? 'bg-[#007BFF] text-white shadow-lg shadow-blue-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-[#007BFF]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profil</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}