import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Trajet {
  id: string;
  ligne: string;
  depart: string;
  arrivee: string;
  heure: string;
  chauffeur: string;
  bus: string;
  statut: 'en_cours' | 'termine' | 'planifie';
}

const mockTrajets: Trajet[] = [
  { id: '1', ligne: '50', depart: 'PETERSEN', arrivee: 'APIX', heure: '08:00', chauffeur: 'Moussa Diop', bus: 'DK-1234-AB', statut: 'en_cours' },
  { id: '2', ligne: '12', depart: 'Parcelles Assainies', arrivee: 'Plateau', heure: '08:30', chauffeur: 'Ibrahima Sow', bus: 'DK-5678-CD', statut: 'termine' },
  { id: '3', ligne: '25', depart: 'Guédiawaye', arrivee: 'Colobane', heure: '09:00', chauffeur: 'Ousmane Sarr', bus: 'DK-9012-EF', statut: 'en_cours' },
  { id: '4', ligne: '33', depart: 'Pikine', arrivee: 'Liberté 6', heure: '09:30', chauffeur: 'Moussa Diop', bus: 'DK-3456-GH', statut: 'planifie' },
  { id: '5', ligne: '8', depart: 'Thiaroye', arrivee: 'Gare Routière', heure: '10:00', chauffeur: 'Ibrahima Sow', bus: 'DK-7890-IJ', statut: 'planifie' },
  { id: '6', ligne: '50', depart: 'APIX', arrivee: 'PETERSEN', heure: '10:30', chauffeur: 'Ousmane Sarr', bus: 'DK-1234-AB', statut: 'planifie' },
];

export function TrajetsManagement() {
  const [trajets] = useState<Trajet[]>(mockTrajets);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatutBadge = (statut: string) => {
    const colors = {
      en_cours: 'bg-blue-100 text-blue-700',
      termine: 'bg-green-100 text-green-700',
      planifie: 'bg-yellow-100 text-yellow-700',
    };
    return colors[statut as keyof typeof colors] || colors.planifie;
  };

  const getStatutLabel = (statut: string) => {
    const labels = {
      en_cours: 'En cours',
      termine: 'Terminé',
      planifie: 'Planifié',
    };
    return labels[statut as keyof typeof labels] || 'Planifié';
  };

  const filteredTrajets = trajets.filter(
    (trajet) =>
      trajet.ligne.includes(searchTerm) ||
      trajet.depart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trajet.arrivee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trajet.chauffeur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Gestion des Trajets & Bus</h1>
          <p className="text-gray-600">Gérer les lignes, itinéraires et affectations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white shadow-lg rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un trajet
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau trajet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ligne">Numéro de ligne</Label>
                  <Input id="ligne" placeholder="Ex: 50" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heure">Heure de départ</Label>
                  <Input id="heure" type="time" className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="depart">Point de départ</Label>
                  <Input id="depart" placeholder="Ex: PETERSEN" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivee">Point d'arrivée</Label>
                  <Input id="arrivee" placeholder="Ex: APIX" className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chauffeur">Chauffeur affecté</Label>
                  <Input id="chauffeur" placeholder="Nom du chauffeur" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bus">Matricule du bus</Label>
                  <Input id="bus" placeholder="Ex: DK-1234-AB" className="rounded-xl" />
                </div>
              </div>
              <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                Créer le trajet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par ligne, départ, arrivée ou chauffeur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Route Visualization */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-[#007BFF]" />
          <h3 className="text-[#1A1A1A] text-xl">Aperçu des Lignes Actives</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Ligne 50', 'Ligne 12', 'Ligne 25'].map((ligne, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#007BFF]">{ligne}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Actif
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {index === 0 ? 'PETERSEN ↔ APIX' : index === 1 ? 'Parcelles ↔ Plateau' : 'Guédiawaye ↔ Colobane'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trajets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Ligne
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Départ
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Arrivée
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Heure
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Chauffeur
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Bus
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTrajets.map((trajet) => (
                <tr key={trajet.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-white shadow-md">
                        {trajet.ligne}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#1A1A1A]">{trajet.depart}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#1A1A1A]">{trajet.arrivee}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{trajet.heure}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{trajet.chauffeur}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 font-mono">{trajet.bus}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(trajet.statut)}`}>
                      {getStatutLabel(trajet.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
