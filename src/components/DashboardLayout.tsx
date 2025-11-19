import { useState } from 'react';
import { cn } from './ui/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  AlertTriangle,
  History,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Bus,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DashboardPage } from './pages/DashboardPage';
import { PlanificationPage } from './pages/PlanificationPage';
import { AffectationPage } from './pages/AffectationPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';

interface DashboardLayoutProps {
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planification', label: 'Planification', icon: Calendar },
  { id: 'affectation', label: 'Affectation Personnel', icon: Users },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle, badge: 3 },
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'profil', label: 'Profil', icon: User },
];

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationCount] = useState(5);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'planification':
        return <PlanificationPage />;
      case 'affectation':
        return <AffectationPage />;
      case 'incidents':
        return <IncidentsPage />;
      case 'historique':
        return <HistoryPage />;
      case 'profil':
        return <ProfilePage onLogout={onLogout} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-full bg-gray-50 relative overflow-hidden rounded-lg">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:absolute lg:top-0 lg:bottom-0 lg:left-0 lg:w-64 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-[#007BFF] rounded-lg flex items-center justify-center">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg">YoonuBus Bi</h1>
            <p className="text-xs text-gray-500">Régulateur</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  activeView === item.id
                    ? 'bg-[#007BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <div className="absolute inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#007BFF] rounded-lg flex items-center justify-center">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg">YoonuBus Bi</h1>
                  <p className="text-xs text-gray-500">Régulateur</p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      activeView === item.id
                        ? 'bg-[#007BFF] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <Button
                onClick={onLogout}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl">
              {menuItems.find((item) => item.id === activeView)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
