import { useState } from 'react';
import { Plus, Edit, Trash2, Bus, User, Search, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BusData {
  id: string;
  matricule: string;
  modele: string;
  statut: 'disponible' | 'en_service' | 'maintenance' | 'hors_service';
  chauffeur: string | null;
  ligne: string | null;
}

interface Chauffeur {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  busAsigne: string | null;
}

const mockBus: BusData[] = [
  { id: '1', matricule: 'AA692KN', modele: 'TATA ', statut: 'en_service', chauffeur: 'Mouspha THIAW', ligne: '80' },
  { id: '1', matricule: 'AA678KN', modele: 'TATA ', statut: 'en_service', chauffeur: 'Amadou LO', ligne: '69' },
  { id: '2', matricule: 'AA198MD', modele: 'TATA', statut: 'en_service', chauffeur: 'Ass Malick TOURE', ligne: '87' },
  { id: '3', matricule: 'DK-9012-EF', modele: 'TATA ', statut: 'disponible', chauffeur: null, ligne: null },
  { id: '4', matricule: 'DK-3456-GH', modele: 'TATA ', statut: 'maintenance', chauffeur: null, ligne: null },
  { id: '5', matricule: 'DK-7890-IJ', modele: 'TATA ', statut: 'en_service', chauffeur: 'Ousmane Sarr', ligne: '25' },
];

const mockChauffeurs: Chauffeur[] = [
  { id: '1', nom: 'SOW ', prenom: 'Cheikhouna', telephone: '+221 77 093 78 29', statut: 'actif', busAsigne: 'AA524GX' },
  { id: '1', nom: 'THIAW ', prenom: 'Moustapha', telephone: '+221 77 406 98 23', statut: 'actif', busAsigne: 'AA692KN' },
  { id: '1', nom: 'Diop', prenom: 'Moussa', telephone: '+221 77 123 45 67', statut: 'actif', busAsigne: 'DK-1234-AB' },
  { id: '2', nom: 'Sow', prenom: 'Ibrahima', telephone: '+221 77 234 56 78', statut: 'actif', busAsigne: 'DK-5678-CD' },
  { id: '3', nom: 'Sarr', prenom: 'Ousmane', telephone: '+221 77 345 67 89', statut: 'actif', busAsigne: 'DK-7890-IJ' },
  { id: '4', nom: 'Kane', prenom: 'Mamadou', telephone: '+221 77 456 78 90', statut: 'actif', busAsigne: null },
  { id: '5', nom: 'Fall', prenom: 'Babacar', telephone: '+221 77 567 89 01', statut: 'suspendu', busAsigne: null },
];

export function BusManagement() {
  const [activeTab, setActiveTab] = useState<'bus' | 'chauffeurs'>('bus');
  const [bus] = useState<BusData[]>(mockBus);
  const [chauffeurs] = useState<Chauffeur[]>(mockChauffeurs);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatutBadge = (statut: string) => {
    const colors = {
      disponible: 'bg-green-100 text-green-700',
      en_service: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-yellow-100 text-yellow-700',
      hors_service: 'bg-red-100 text-red-700',
      actif: 'bg-green-100 text-green-700',
      inactif: 'bg-gray-100 text-gray-700',
      suspendu: 'bg-red-100 text-red-700',
    };
    return colors[statut as keyof typeof colors] || colors.disponible;
  };

  const getStatutLabel = (statut: string) => {
    const labels = {
      disponible: 'Disponible',
      en_service: 'En Service',
      maintenance: 'Maintenance',
      hors_service: 'Hors Service',
      actif: 'Actif',
      inactif: 'Inactif',
      suspendu: 'Suspendu',
    };
    return labels[statut as keyof typeof labels] || statut;
  };

  const filteredBus = bus.filter(
    (b) =>
      b.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.chauffeur && b.chauffeur.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredChauffeurs = chauffeurs.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telephone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Gestion des Bus & Chauffeurs</h1>
          <p className="text-gray-600">Enregistrer, modifier et assigner les bus et chauffeurs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white shadow-lg rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              {activeTab === 'bus' ? 'Ajouter un bus' : 'Ajouter un chauffeur'}
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>{activeTab === 'bus' ? 'Ajouter un nouveau bus' : 'Ajouter un nouveau chauffeur'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {activeTab === 'bus' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="matricule">Matricule</Label>
                    <Input id="matricule" placeholder="Ex: DK-1234-AB" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modele">Modèle</Label>
                    <Input id="modele" placeholder="Ex: TATA Ultra" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modele">Ligne</Label>
                    <Input id="modele" placeholder="Ex: Ligne 02" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statut">Statut</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="en_service">En Service</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="hors_service">Hors Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                    <div className="space-y-2">
                    <Label htmlFor="statut">Chauffeur</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Moustapha THIAW</SelectItem>
                        <SelectItem value="en_service">Modou LO</SelectItem>
                        <SelectItem value="maintenance">Ass Malick TOURE</SelectItem>
                        <SelectItem value="hors_service">Saliou NDIAYE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" placeholder="Nom de famille" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input id="prenom" placeholder="Prénom" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input id="telephone" placeholder="+221 77 123 45 67" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@yoonubus.sn" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permis">Numéro de permis</Label>
                    <Input id="permis" placeholder="Numéro de permis de conduire" className="rounded-xl" />
                  </div>
                </>
              )}
              <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                {activeTab === 'bus' ? 'Créer le bus' : 'Créer le chauffeur'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('bus')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'bus'
                ? 'bg-[#007BFF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bus className="w-5 h-5" />
            <span>Bus</span>
          </button>
          <button
            onClick={() => setActiveTab('chauffeurs')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'chauffeurs'
                ? 'bg-[#007BFF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Chauffeurs</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={activeTab === 'bus' ? 'Rechercher par matricule, modèle ou chauffeur...' : 'Rechercher par nom, prénom ou téléphone...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'bus' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Matricule</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Modèle</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Chauffeur Assigné</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Ligne</th>
                  <th className="px-6 py-4 text-right text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBus.map((busItem) => (
                  <tr key={busItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-[#1A1A1A] font-mono">{busItem.matricule}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{busItem.modele}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(busItem.statut)}`}>
                        {getStatutLabel(busItem.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{busItem.chauffeur || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      {busItem.ligne ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-white shadow-md">
                          {busItem.ligne}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
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
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Nom & Prénom</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Téléphone</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Bus Assigné</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-right text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredChauffeurs.map((chauffeur) => (
                  <tr key={chauffeur.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-md">
                          {chauffeur.prenom[0]}{chauffeur.nom[0]}
                        </div>
                        <p className="text-[#1A1A1A]">{chauffeur.prenom} {chauffeur.nom}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{chauffeur.telephone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 font-mono">{chauffeur.busAsigne || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(chauffeur.statut)}`}>
                        {getStatutLabel(chauffeur.statut)}
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
      )}
    </div>
  );
}