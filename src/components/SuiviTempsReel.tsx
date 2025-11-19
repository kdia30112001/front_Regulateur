import { useState, useEffect } from 'react';
import { MapPin, Bus, AlertCircle, Clock, Activity } from 'lucide-react';

interface BusPosition {
  id: string;
  ligne: string;
  matricule: string;
  chauffeur: string;
  position: { lat: number; lng: number };
  vitesse: number;
  retard: number;
  passagers: number;
  statut: 'en_route' | 'a_larret' | 'retard' | 'hors_ligne';
}

const mockBusPositions: BusPosition[] = [
  {
    id: '1',
    ligne: '50',
    matricule: 'DK-1234-AB',
    chauffeur: 'Moussa Diop',
    position: { lat: 14.7167, lng: -17.4677 },
    vitesse: 45,
    retard: 0,
    passagers: 32,
    statut: 'en_route',
  },
  {
    id: '2',
    ligne: '12',
    matricule: 'DK-5678-CD',
    chauffeur: 'Ibrahima Sow',
    position: { lat: 14.7300, lng: -17.4500 },
    vitesse: 0,
    retard: 5,
    passagers: 28,
    statut: 'a_larret',
  },
  {
    id: '3',
    ligne: '25',
    matricule: 'DK-9012-EF',
    chauffeur: 'Ousmane Sarr',
    position: { lat: 14.7450, lng: -17.4800 },
    vitesse: 38,
    retard: 15,
    passagers: 41,
    statut: 'retard',
  },
];

export function SuiviTempsReel() {
  const [busPositions, setBusPositions] = useState<BusPosition[]>(mockBusPositions);
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositions((prev) =>
        prev.map((bus) => ({
          ...bus,
          position: {
            lat: bus.position.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.position.lng + (Math.random() - 0.5) * 0.001,
          },
          vitesse: bus.statut === 'a_larret' ? 0 : Math.floor(Math.random() * 50) + 20,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatutColor = (statut: string) => {
    const colors = {
      en_route: 'text-green-600 bg-green-100',
      a_larret: 'text-blue-600 bg-blue-100',
      retard: 'text-yellow-600 bg-yellow-100',
      hors_ligne: 'text-red-600 bg-red-100',
    };
    return colors[statut as keyof typeof colors] || colors.en_route;
  };

  const getStatutLabel = (statut: string) => {
    const labels = {
      en_route: 'En route',
      a_larret: 'À l\'arrêt',
      retard: 'En retard',
      hors_ligne: 'Hors ligne',
    };
    return labels[statut as keyof typeof labels] || statut;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A1A] text-3xl mb-2">Suivi en Temps Réel</h1>
        <p className="text-gray-600">Visualiser la position et l'état des bus en circulation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <Bus className="w-8 h-8 text-green-500" />
            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">{busPositions.length}</p>
          <p className="text-gray-600 text-sm">Bus en ligne</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="w-8 h-8 text-blue-500" />
            <span className="text-xs text-gray-500">Actif</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">
            {busPositions.filter((b) => b.statut === 'en_route').length}
          </p>
          <p className="text-gray-600 text-sm">En circulation</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-500" />
            <span className="text-xs text-gray-500">Alerte</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">
            {busPositions.filter((b) => b.retard > 0).length}
          </p>
          <p className="text-gray-600 text-sm">En retard</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="text-xs text-gray-500">Urgent</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">0</p>
          <p className="text-gray-600 text-sm">Hors ligne</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#1A1A1A] text-xl">Carte de Suivi</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Mise à jour en temps réel</span>
            </div>
          </div>

          {/* Simulated Map */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 overflow-hidden" style={{ height: '500px' }}>
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(#007BFF 1px, transparent 1px), linear-gradient(90deg, #007BFF 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}></div>
            </div>

            {/* Bus Markers */}
            {busPositions.map((bus, index) => (
              <div
                key={bus.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{
                  left: `${30 + index * 25}%`,
                  top: `${40 + (index % 2) * 20}%`,
                }}
                onClick={() => setSelectedBus(bus)}
              >
                {/* Pulse Animation */}
                <div className="absolute inset-0 w-12 h-12 bg-[#007BFF] rounded-full animate-ping opacity-20"></div>
                
                {/* Bus Icon */}
                <div className={`relative w-12 h-12 ${
                  bus.statut === 'retard' ? 'bg-yellow-500' : 
                  bus.statut === 'a_larret' ? 'bg-blue-500' : 
                  'bg-green-500'
                } rounded-full flex items-center justify-center shadow-lg`}>
                  <Bus className="w-6 h-6 text-white" />
                </div>

                {/* Line Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-[#007BFF] rounded-full flex items-center justify-center text-xs text-[#007BFF] shadow-md">
                  {bus.ligne}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg">
              <p className="text-xs text-gray-600 mb-2">Légende</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">En route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">À l'arrêt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">En retard</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-[#1A1A1A] text-xl mb-6">Bus Actifs</h3>
          <div className="space-y-3">
            {busPositions.map((bus) => (
              <div
                key={bus.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedBus?.id === bus.id
                    ? 'border-[#007BFF] bg-blue-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedBus(bus)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-white shadow-md">
                      {bus.ligne}
                    </div>
                    <div>
                      <p className="text-[#1A1A1A] font-mono text-sm">{bus.matricule}</p>
                      <p className="text-gray-500 text-xs">{bus.chauffeur}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatutColor(bus.statut)}`}>
                    {getStatutLabel(bus.statut)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Activity className="w-3 h-3" />
                    <span>{bus.vitesse} km/h</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bus className="w-3 h-3" />
                    <span>{bus.passagers} pass.</span>
                  </div>
                  {bus.retard > 0 && (
                    <div className="col-span-2 flex items-center gap-1 text-yellow-600">
                      <Clock className="w-3 h-3" />
                      <span>Retard: {bus.retard} min</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Bus Details */}
          {selectedBus && (
            <div className="mt-6 p-4 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl text-white">
              <h4 className="mb-3">Détails - Ligne {selectedBus.ligne}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Matricule:</span>
                  <span className="font-mono">{selectedBus.matricule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Chauffeur:</span>
                  <span>{selectedBus.chauffeur}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Vitesse:</span>
                  <span>{selectedBus.vitesse} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Passagers:</span>
                  <span>{selectedBus.passagers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Position GPS:</span>
                  <span className="text-xs">
                    {selectedBus.position.lat.toFixed(4)}, {selectedBus.position.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
