import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { History, TrendingUp, Bus, AlertTriangle, Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { day: 'Lun', trajets: 45, retards: 3, incidents: 1 },
  { day: 'Mar', trajets: 48, retards: 2, incidents: 2 },
  { day: 'Mer', trajets: 52, retards: 4, incidents: 1 },
  { day: 'Jeu', trajets: 47, retards: 1, incidents: 0 },
  { day: 'Ven', trajets: 51, retards: 5, incidents: 3 },
  { day: 'Sam', trajets: 38, retards: 2, incidents: 1 },
  { day: 'Dim', trajets: 35, retards: 1, incidents: 0 },
];

const punctualityData = [
  { day: 'Lun', taux: 93 },
  { day: 'Mar', taux: 96 },
  { day: 'Mer', taux: 92 },
  { day: 'Jeu', taux: 98 },
  { day: 'Ven', taux: 90 },
  { day: 'Sam', taux: 95 },
  { day: 'Dim', taux: 97 },
];

const pastTrips = [
  {
    id: 1,
    bus: 'AA513GC',
    line: 'Ligne 12',
    driver: 'Ibrahima Ndiaye',
    date: '2025-11-10',
    time: '08:00',
    status: 'completed',
    delay: 0,
    incidents: 0,
  },
  {
    id: 2,
    bus: 'AA873ML',
    line: 'Ligne 23',
    driver: 'Mamadou Diop',
    date: '2025-11-10',
    time: '08:30',
    status: 'completed',
    delay: 5,
    incidents: 1,
  },
  {
    id: 3,
    bus: 'AB124KL',
    line: 'Ligne 45',
    driver: 'Ousmane Fall',
    date: '2025-11-09',
    time: '09:00',
    status: 'completed',
    delay: 0,
    incidents: 0,
  },
  {
    id: 4,
    bus: 'AA965TR',
    line: 'Ligne 12',
    driver: 'Abdou Seck',
    date: '2025-11-09',
    time: '10:00',
    status: 'completed',
    delay: 3,
    incidents: 0,
  },
  {
    id: 5,
    bus: 'AB301PQ',
    line: 'Ligne 67',
    driver: 'Moustapha Sarr',
    date: '2025-11-09',
    time: '10:30',
    status: 'completed',
    delay: 0,
    incidents: 0,
  },
  {
    id: 6,
    bus: 'AB567FR',
    line: 'Ligne 8',
    driver: 'Cheikh Diallo',
    date: '2025-11-08',
    time: '14:00',
    status: 'completed',
    delay: 2,
    incidents: 0,
  },
];

export function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Trajets cette semaine</CardDescription>
            <CardTitle className="text-2xl">316</CardTitle>
            <p className="text-xs text-green-600">+12% vs semaine dernière</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taux de ponctualité</CardDescription>
            <CardTitle className="text-2xl">94%</CardTitle>
            <p className="text-xs text-green-600">+2% vs semaine dernière</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Retards totaux</CardDescription>
            <CardTitle className="text-2xl">18</CardTitle>
            <p className="text-xs text-red-600">+3 vs semaine dernière</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Incidents résolus</CardDescription>
            <CardTitle className="text-2xl">8</CardTitle>
            <p className="text-xs text-green-600">-2 vs semaine dernière</p>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance hebdomadaire
            </CardTitle>
            <CardDescription>Trajets, retards et incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trajets" fill="#007BFF" name="Trajets" />
                <Bar dataKey="retards" fill="#FFD43B" name="Retards" />
                <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Punctuality Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Évolution de la ponctualité
            </CardTitle>
            <CardDescription>Taux de ponctualité quotidien (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={punctualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="taux"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Taux (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Past Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historique des trajets
          </CardTitle>
          <CardDescription>Trajets récents et incidents associés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Heure</th>
                  <th className="pb-3 px-4">Bus</th>
                  <th className="pb-3 px-4">Ligne</th>
                  <th className="pb-3 px-4">Chauffeur</th>
                  <th className="pb-3 px-4">Retard</th>
                  <th className="pb-3 px-4">Incidents</th>
                  <th className="pb-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {pastTrips.map((trip) => (
                  <tr key={trip.id} className="border-b last:border-0">
                    <td className="py-3 px-4">{trip.date}</td>
                    <td className="py-3 px-4">{trip.time}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{trip.bus}</Badge>
                    </td>
                    <td className="py-3 px-4">{trip.line}</td>
                    <td className="py-3 px-4">{trip.driver}</td>
                    <td className="py-3 px-4">
                      {trip.delay > 0 ? (
                        <span className="text-red-600">+{trip.delay} min</span>
                      ) : (
                        <span className="text-green-600">À l'heure</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {trip.incidents > 0 ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          {trip.incidents}
                        </div>
                      ) : (
                        <span className="text-gray-500">Aucun</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={trip.status === 'completed' ? 'default' : 'destructive'}
                        className={
                          trip.status === 'completed' ? 'bg-green-500' : ''
                        }
                      >
                        {trip.status === 'completed' ? 'Terminé' : 'Annulé'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">Charger plus</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
