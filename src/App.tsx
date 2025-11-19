import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardHome } from './components/DashboardHome';
import { UsersManagement } from './components/UsersManagement';
import { TrajetsManagement } from './components/TrajetsManagement';
import { BusManagement } from './components/BusManagement';
import { ItinerairesManagement } from './components/ItinerairesManagement';
import { SuiviTempsReel } from './components/SuiviTempsReel';
import { IncidentsNotifications } from './components/IncidentsNotifications';
import { Historique } from './components/Historique';
import { AdminProfile } from './components/AdminProfile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'users' | 'bus' | 'itineraires' | 'suivi' | 'incidents' | 'trajets' | 'historique' | 'profile'>('dashboard');

  return (
    <div className="flex h-screen bg-[#F4F6F9]">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onProfileClick={() => setCurrentPage('profile')} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {currentPage === 'dashboard' && <DashboardHome onNavigate={setCurrentPage} />}
          {currentPage === 'users' && <UsersManagement />}
          {currentPage === 'bus' && <BusManagement />}
          {currentPage === 'itineraires' && <ItinerairesManagement />}
          {currentPage === 'suivi' && <SuiviTempsReel />}
          {currentPage === 'incidents' && <IncidentsNotifications />}
          {currentPage === 'trajets' && <TrajetsManagement />}
          {currentPage === 'historique' && <Historique />}
          {currentPage === 'profile' && <AdminProfile onNavigate={setCurrentPage} />}
        </main>
      </div>
    </div>
  );
}