import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bus, Users, AlertTriangle, TrendingUp, MapPin, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react';

const stats = [
  { title: 'Bus en circulation', value: '42', change: '+3', icon: Bus, color: 'bg-[#007BFF]' },
  { title: 'Personnel actif', value: '84', change: '+6', icon: Users, color: 'bg-green-500' },
  { title: 'Incidents actifs', value: '3', change: '-2', icon: AlertTriangle, color: 'bg-red-500' },
  { title: 'Taux de ponctualité', value: '94%', change: '+2%', icon: TrendingUp, color: 'bg-[#FFD43B]' },
];

const busLines = [
  { line: 'Ligne 12', status: 'active', busCount: 5, color: '#007BFF' },
  { line: 'Ligne 23', status: 'active', busCount: 4, color: '#10b981' },
  { line: 'Ligne 45', status: 'active', busCount: 3, color: '#f59e0b' },
  { line: 'Ligne 67', status: 'active', busCount: 4, color: '#8b5cf6' },
  { line: 'Ligne 8', status: 'delayed', busCount: 2, color: '#ef4444' },
];

const activeBuses = [
  { id: 'AA513GC', line: 'Ligne 12', status: 'En circulation', delay: 0 },
  { id: 'AA873ML', line: 'Ligne 23', status: 'En circulation', delay: 5 },
  { id: 'AB124KL', line: 'Ligne 45', status: 'À l\'arrêt', delay: 0 },
  { id: 'AA965TR', line: 'Ligne 12', status: 'En circulation', delay: 0 },
  { id: 'AB301PQ', line: 'Ligne 67', status: 'En circulation', delay: 12 },
];

const recentIncidents = [
  { id: 1, bus: 'AB301PQ', type: 'Panne mécanique', time: 'Il y a 15 min', priority: 'high' },
  { id: 2, bus: 'AA873ML', type: 'Retard', time: 'Il y a 30 min', priority: 'medium' },
  { id: 3, bus: 'AB567FR', type: 'Embouteillage', time: 'Il y a 1h', priority: 'low' },
];

export function DashboardPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Simple map simulation with CSS
    const ctx = document.createElement('canvas');
    if (!mapRef.current.querySelector('canvas')) {
      ctx.width = mapRef.current.offsetWidth;
      ctx.height = mapRef.current.offsetHeight;
      ctx.style.width = '100%';
      ctx.style.height = '100%';
      mapRef.current.appendChild(ctx);

      const context = ctx.getContext('2d');
      if (context) {
        // Draw simple grid background
        context.fillStyle = '#f3f4f6';
        context.fillRect(0, 0, ctx.width, ctx.height);

        // Draw grid lines
        context.strokeStyle = '#e5e7eb';
        context.lineWidth = 1;
        for (let i = 0; i < ctx.width; i += 50) {
          context.beginPath();
          context.moveTo(i, 0);
          context.lineTo(i, ctx.height);
          context.stroke();
        }
        for (let i = 0; i < ctx.height; i += 50) {
          context.beginPath();
          context.moveTo(0, i);
          context.lineTo(ctx.width, i);
          context.stroke();
        }

        // Draw points for each line
        busLines.forEach((line, lineIndex) => {
          // Draw multiple points for each line (representing buses on that line)
          for (let i = 0; i < line.busCount; i++) {
            const x = 80 + (lineIndex * 100) + (i * 20);
            const y = 100 + (Math.sin(lineIndex + i) * 50) + (i * 30);

            // Draw bus marker
            context.fillStyle = line.color;
            context.beginPath();
            context.arc(x, y, 8, 0, 2 * Math.PI);
            context.fill();

            // Draw white outline
            context.strokeStyle = '#ffffff';
            context.lineWidth = 2;
            context.stroke();
          }
        });
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <p className="text-xs text-gray-500">
                  <span className="text-green-600">{stat.change}</span> vs hier
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Carte en temps réel
            </CardTitle>
            <CardDescription>Lignes actives et trajets en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={mapRef}
              className="w-full h-80 bg-gray-100 rounded-lg relative overflow-hidden"
            >
              {/* Canvas will be added here */}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#007BFF]"></div>
                <span>Ligne 12</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#10b981]"></div>
                <span>Ligne 23</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#f59e0b]"></div>
                <span>Ligne 45</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8b5cf6]"></div>
                <span>Ligne 67</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ef4444]"></div>
                <span>Ligne 8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Incidents récents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-3 bg-gray-50 rounded-lg space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{incident.bus}</span>
                  <Badge
                    variant={
                      incident.priority === 'high'
                        ? 'destructive'
                        : incident.priority === 'medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {incident.priority === 'high' ? 'Urgent' : incident.priority === 'medium' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{incident.type}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {incident.time}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Voir tous les incidents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Buses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bus en circulation</CardTitle>
          <CardDescription>État actuel de la flotte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 px-4">Bus</th>
                  <th className="pb-3 px-4">Ligne</th>
                  <th className="pb-3 px-4">Statut</th>
                  <th className="pb-3 px-4">Retard</th>
                  <th className="pb-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeBuses.map((bus) => (
                  <tr key={bus.id} className="border-b last:border-0">
                    <td className="py-3 px-4">{bus.id}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{bus.line}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-2 ${
                          bus.status === 'En circulation'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            bus.status === 'En circulation'
                              ? 'bg-green-600'
                              : 'bg-gray-600'
                          }`}
                        ></div>
                        {bus.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {bus.delay > 0 ? (
                        <span className="text-red-600">+{bus.delay} min</span>
                      ) : (
                        <span className="text-green-600">À l'heure</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
