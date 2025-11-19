import { useState } from 'react';
import { Download, FileText, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HistoriqueEntry {
  id: string;
  ligne: string;
  date: string;
  heureTheorique: string;
  heureReelle: string;
  retard: number;
  incidents: string;
}

const mockHistorique: HistoriqueEntry[] = [
  { id: '1', ligne: '50', date: '2025-11-14', heureTheorique: '08:00', heureReelle: '08:15', retard: 15, incidents: 'Embouteillage Route de Front de Terre' },
  { id: '2', ligne: '12', date: '2025-11-14', heureTheorique: '08:30', heureReelle: '08:30', retard: 0, incidents: 'Aucun' },
  { id: '3', ligne: '25', date: '2025-11-14', heureTheorique: '09:00', heureReelle: '09:05', retard: 5, incidents: 'Arrêt prolongé' },
  { id: '4', ligne: '33', date: '2025-11-13', heureTheorique: '09:30', heureReelle: '09:45', retard: 15, incidents: 'Panne mécanique mineure' },
  { id: '5', ligne: '8', date: '2025-11-13', heureTheorique: '10:00', heureReelle: '10:10', retard: 10, incidents: 'Trafic dense' },
  { id: '6', ligne: '50', date: '2025-11-13', heureTheorique: '10:30', heureReelle: '10:30', retard: 0, incidents: 'Aucun' },
  { id: '7', ligne: '12', date: '2025-11-12', heureTheorique: '08:30', heureReelle: '08:35', retard: 5, incidents: 'Aucun' },
  { id: '8', ligne: '25', date: '2025-11-12', heureTheorique: '09:00', heureReelle: '09:20', retard: 20, incidents: 'Accident bloquant la voie' },
];

export function Historique() {
  const [historique] = useState<HistoriqueEntry[]>(mockHistorique);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistorique = historique.filter(
    (entry) =>
      entry.ligne.includes(searchTerm) ||
      entry.date.includes(searchTerm) ||
      entry.incidents.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = () => {
    alert('Export PDF en cours... (fonctionnalité à implémenter)');
  };

  const handleExportCSV = () => {
    alert('Export CSV en cours... (fonctionnalité à implémenter)');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Historique & Rapports</h1>
          <p className="text-gray-600">Consulter l'historique des trajets et générer des rapports</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExportPDF}
            className="bg-red-500 hover:bg-red-600 text-white shadow-lg rounded-xl gap-2"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </Button>
          <Button
            onClick={handleExportCSV}
            className="bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-xl gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-xs text-gray-500">Cette semaine</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">156</p>
          <p className="text-gray-600 text-sm">Trajets effectués</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600">⏱️</span>
            </div>
            <span className="text-xs text-gray-500">Moyenne</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">8 min</p>
          <p className="text-gray-600 text-sm">Retard moyen</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600">⚠️</span>
            </div>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">12</p>
          <p className="text-gray-600 text-sm">Incidents signalés</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600">✓</span>
            </div>
            <span className="text-xs text-gray-500">Taux</span>
          </div>
          <p className="text-3xl text-[#1A1A1A] mb-1">92%</p>
          <p className="text-gray-600 text-sm">Ponctualité</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par ligne, date ou incident..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Historique Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Ligne
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Heure Théorique
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Heure Réelle
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Retard
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Incidents Signalés
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistorique.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-white shadow-md">
                        {entry.ligne}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#1A1A1A]">{new Date(entry.date).toLocaleDateString('fr-FR')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{entry.heureTheorique}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{entry.heureReelle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        entry.retard === 0
                          ? 'bg-green-100 text-green-700'
                          : entry.retard < 10
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {entry.retard > 0 ? `+${entry.retard} min` : 'À l\'heure'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${entry.incidents === 'Aucun' ? 'text-green-600' : 'text-gray-600'}`}>
                      {entry.incidents}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
