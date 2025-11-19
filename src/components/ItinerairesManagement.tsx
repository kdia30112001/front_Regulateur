import { useState } from 'react';
import { Plus, Edit, Trash2, Route, MapPin, Clock, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Itineraire {
  id: string;
  ligne: string;
  nom: string;
  depart: string;
  arrivee: string;
  nombreArrets: number;
  duree: string;
  horaires: string[];
  statut: 'actif' | 'inactif' | 'en_travaux';
}

const mockItineraires: Itineraire[] = [
  {
    id: '1',
    ligne: '50',
    nom: 'PETERSEN ↔ APIX',
    depart: 'PETERSEN',
    arrivee: 'APIX',
    nombreArrets: 42,
    duree: ' 2 heures',
    horaires: ['06:00', '07:00', '08:00', '09:00', '17:00', '18:00'],
    statut: 'actif',
  },
  {
    id: '2',
    ligne: '12',
    nom: 'Guediawaye ↔ Gare Palais',
    depart: 'Guédiawaye',
    arrivee: 'Palais',
    nombreArrets: 63,
    duree: '60 min',
    horaires: ['06:30', '08:00', '09:30', '17:30', '19:00'],
    statut: 'actif',
  },
  {
    id: '3',
    ligne: '25',
    nom: 'Guédiawaye ↔ Colobane',
    depart: 'Guédiawaye',
    arrivee: 'Colobane',
    nombreArrets: 10,
    duree: '40 min',
    horaires: ['07:00', '09:00', '11:00', '16:00', '18:00'],
    statut: 'actif',
  },
  {
    id: '4',
    ligne: '32',
    nom: 'Guédiawaye(Bvar. Tapée) ↔  Sahm',
    depart: 'Guédiawaye',
    arrivee: 'Sahm',
    nombreArrets: 61,
    duree: '35 min',
    horaires: ['06:00', '08:30', '10:00', '17:00'],
    statut: 'actif',
  },
];

const arrets50 = [
  'PETERSEN',
  'Route de Front de Terre',
  'Yoff Virage',
  'Aéroport LSS',
  'Malick Sy',
  'Mermoz'
];

export function ItinerairesManagement() {
  const [itineraires] = useState<Itineraire[]>(mockItineraires);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItineraire, setSelectedItineraire] = useState<Itineraire | null>(null);

  const getStatutBadge = (statut: string) => {
    const colors = {
      actif: 'bg-green-100 text-green-700',
      inactif: 'bg-gray-100 text-gray-700',
      en_travaux: 'bg-yellow-100 text-yellow-700',
    };
    return colors[statut as keyof typeof colors] || colors.actif;
  };

  const getStatutLabel = (statut: string) => {
    const labels = {
      actif: 'Actif',
      inactif: 'Inactif',
      en_travaux: 'En Travaux',
    };
    return labels[statut as keyof typeof labels] || statut;
  };

  const filteredItineraires = itineraires.filter(
    (itineraire) =>
      itineraire.ligne.includes(searchTerm) ||
      itineraire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itineraire.depart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itineraire.arrivee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Gestion des Itinéraires & Lignes</h1>
          <p className="text-gray-600">Créer, modifier et gérer les itinéraires et horaires</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white shadow-lg rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Créer un itinéraire
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouvel itinéraire</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ligne">Numéro de ligne</Label>
                  <Input id="ligne" placeholder="Ex: 50" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de l'itinéraire</Label>
                  <Input id="nom" placeholder="Ex: PETERSEN ↔ APIX" className="rounded-xl" />
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
              <div className="space-y-2">
                <Label htmlFor="arrets">Arrêts (séparés par des virgules)</Label>
                <Input
                  id="arrets"
                  placeholder="Arrêt 1, Arrêt 2, Arrêt 3..."
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duree">Durée estimée</Label>
                <Input id="duree" placeholder="Ex: 45 min" className="rounded-xl" />
              </div>
              <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                Créer l'itinéraire
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
            placeholder="Rechercher par ligne, nom ou terminus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Itineraires Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItineraires.map((itineraire) => (
          <div
            key={itineraire.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedItineraire(itineraire)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center text-white shadow-lg text-xl">
                  {itineraire.ligne}
                </div>
                <div>
                  <h3 className="text-[#1A1A1A] text-lg">{itineraire.nom}</h3>
                  <p className="text-gray-500 text-sm">{itineraire.nombreArrets} arrêts • {itineraire.duree}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(itineraire.statut)}`}>
                {getStatutLabel(itineraire.statut)}
              </span>
            </div>

            {/* Route */}
            <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
              <MapPin className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-[#1A1A1A]">{itineraire.depart}</p>
              </div>
              <div className="text-gray-400">→</div>
              <div className="flex-1 text-right">
                <p className="text-[#1A1A1A]">{itineraire.arrivee}</p>
              </div>
              <MapPin className="w-5 h-5 text-red-600" />
            </div>

            {/* Horaires */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">Horaires de départ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {itineraire.horaires.map((horaire, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {horaire}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <Dialog open={selectedItineraire !== null} onOpenChange={() => setSelectedItineraire(null)}>
        <DialogContent className="rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'itinéraire - Ligne {selectedItineraire?.ligne}</DialogTitle>
          </DialogHeader>
          {selectedItineraire && (
            <div className="space-y-6 py-4">
              {/* Route Info */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <h4 className="text-[#1A1A1A] mb-2">Itinéraire</h4>
                <p className="text-gray-700">{selectedItineraire.nom}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedItineraire.nombreArrets} arrêts • Durée: {selectedItineraire.duree}
                </p>
              </div>

              {/* Arrêts List */}
              <div>
                <h4 className="text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <Route className="w-5 h-5 text-[#007BFF]" />
                  Liste des arrêts
                </h4>
                <div className="space-y-2">
                  {(selectedItineraire.ligne === '50' ? arrets50 : [selectedItineraire.depart, '...', selectedItineraire.arrivee]).map((arret, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-[#007BFF] text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <p className="text-[#1A1A1A]">{arret}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
