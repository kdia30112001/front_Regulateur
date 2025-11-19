import { Users, UserCheck, Shield, Bus, TrendingUp, AlertCircle, MapPin, AlertTriangle, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const trafficData = [
  { day: 'Lun', trajets: 245 },
  { day: 'Mar', trajets: 312 },
  { day: 'Mer', trajets: 289 },
  { day: 'Jeu', trajets: 356 },
  { day: 'Ven', trajets: 401 },
  { day: 'Sam', trajets: 289 },
  { day: 'Dim', trajets: 198 },
];

const statsData = [
  { name: 'Trajets', effectues: 156, retards: 12, incidents: 3 },
  { name: 'Semaine', effectues: 892, retards: 45, incidents: 8 },
];

interface DashboardHomeProps {
  onNavigate: (page: 'dashboard' | 'users' | 'bus' | 'itineraires' | 'suivi' | 'incidents' | 'trajets' | 'historique' | 'profile') => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const kpis = [
    { label: 'Total Utilisateurs', value: '2600', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%', page: 'users' },
    { label: 'Chauffeurs Actifs', value: '120', icon: UserCheck, color: 'from-green-500 to-green-600', change: '+5%', page: 'bus' },
    { label: 'Bus en Circulation', value: '114', icon: Bus, color: 'from-yellow-500 to-yellow-600', change: '38 en ligne', page: 'suivi' },
    { label: 'Incidents Actifs', value: '4', icon: AlertTriangle, color: 'from-red-500 to-red-600', change: '8 résolus', page: 'incidents' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A1A] text-3xl mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre plateforme YoonuBus Bi</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              onClick={() => onNavigate(kpi.page)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{kpi.label}</h3>
              <p className="text-[#1A1A1A] text-3xl">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-[#1A1A1A] text-xl mb-6">Trafic Journalier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              />
              <Line type="monotone" dataKey="trajets" stroke="#007BFF" strokeWidth={3} dot={{ fill: '#007BFF', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-[#1A1A1A] text-xl mb-6">Trajets, Retards & Incidents</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              />
              <Legend />
              <Bar dataKey="effectues" fill="#007BFF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="retards" fill="#FFD43B" radius={[8, 8, 0, 0]} />
              <Bar dataKey="incidents" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-[#1A1A1A] text-xl mb-4">Alertes & Notifications</h3>
        <div className="space-y-3">
          {[
            { type: 'warning', message: 'Bus L-50 signale un retard de 15 minutes sur le trajet PETERSEN → APIX', time: 'Il y a 5 min' },
            { type: 'info', message: '3 nouveaux chauffeurs ont été ajoutés au système', time: 'Il y a 1h' },
            { type: 'success', message: 'Trajet L-12 complété avec succès - 89 passagers transportés', time: 'Il y a 2h' },
          ].map((alert, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border border-yellow-200'
                  : alert.type === 'info'
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning'
                    ? 'text-yellow-600'
                    : alert.type === 'info'
                    ? 'text-blue-600'
                    : 'text-green-600'
                }`}
              />
              <div className="flex-1">
                <p className="text-[#1A1A1A] text-sm">{alert.message}</p>
                <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}