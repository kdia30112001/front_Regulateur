import { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, Clock, User, Bus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Incident {
  id: string;
  type: 'panne' | 'retard' | 'accident' | 'embouteillage' | 'autre';
  ligne: string;
  bus: string;
  description: string;
  reportePar: string;
  dateHeure: string;
  statut: 'en_cours' | 'resolu' | 'en_attente';
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
}

interface Notification {
  id: string;
  titre: string;
  message: string;
  destinataires: 'tous' | 'chauffeurs' | 'usagers' | 'regulateurs';
  dateEnvoi: string;
  statut: 'envoye' | 'programme' | 'brouillon';
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'retard',
    ligne: '50',
    bus: 'DK-1234-AB',
    description: 'Embouteillage important sur la Route de Front de Terre',
    reportePar: 'Moussa Diop (Chauffeur)',
    dateHeure: '2025-11-14 08:15',
    statut: 'en_cours',
    priorite: 'moyenne',
  },
  {
    id: '2',
    type: 'panne',
    ligne: '25',
    bus: 'DK-9012-EF',
    description: 'Panne mécanique - problème moteur',
    reportePar: 'Ousmane Sarr (Chauffeur)',
    dateHeure: '2025-11-14 09:30',
    statut: 'en_attente',
    priorite: 'haute',
  },
  {
    id: '3',
    type: 'embouteillage',
    ligne: '12',
    bus: 'DK-5678-CD',
    description: 'Trafic dense à Parcelles Assainies',
    reportePar: 'Système automatique',
    dateHeure: '2025-11-14 07:45',
    statut: 'resolu',
    priorite: 'basse',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    titre: 'Retard Ligne 50',
    message: 'Le bus de la ligne 50 accuse un retard de 15 minutes dû à un embouteillage.',
    destinataires: 'usagers',
    dateEnvoi: '2025-11-14 08:20',
    statut: 'envoye',
  },
  {
    id: '2',
    titre: 'Changement d\'itinéraire',
    message: 'Déviation temporaire sur la ligne 33 en raison de travaux.',
    destinataires: 'tous',
    dateEnvoi: '2025-11-14 06:00',
    statut: 'envoye',
  },
];

export function IncidentsNotifications() {
  const [activeTab, setActiveTab] = useState<'incidents' | 'notifications'>('incidents');
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [filterStatut, setFilterStatut] = useState<string>('tous');

  const getTypeBadge = (type: string) => {
    const colors = {
      panne: 'bg-red-100 text-red-700',
      retard: 'bg-yellow-100 text-yellow-700',
      accident: 'bg-red-100 text-red-700',
      embouteillage: 'bg-orange-100 text-orange-700',
      autre: 'bg-gray-100 text-gray-700',
    };
    return colors[type as keyof typeof colors] || colors.autre;
  };

  const getStatutBadge = (statut: string) => {
    const colors = {
      en_cours: 'bg-blue-100 text-blue-700',
      resolu: 'bg-green-100 text-green-700',
      en_attente: 'bg-yellow-100 text-yellow-700',
      envoye: 'bg-green-100 text-green-700',
      programme: 'bg-blue-100 text-blue-700',
      brouillon: 'bg-gray-100 text-gray-700',
    };
    return colors[statut as keyof typeof colors] || colors.en_cours;
  };

  const getPrioriteBadge = (priorite: string) => {
    const colors = {
      basse: 'bg-gray-100 text-gray-700',
      moyenne: 'bg-yellow-100 text-yellow-700',
      haute: 'bg-orange-100 text-orange-700',
      critique: 'bg-red-100 text-red-700',
    };
    return colors[priorite as keyof typeof colors] || colors.basse;
  };

  const filteredIncidents = filterStatut === 'tous'
    ? incidents
    : incidents.filter((i) => i.statut === filterStatut);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Incidents & Notifications</h1>
          <p className="text-gray-600">Gérer les incidents et envoyer des notifications</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white shadow-lg rounded-xl gap-2">
              <Send className="w-4 h-4" />
              Envoyer une notification
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Envoyer une notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre</Label>
                <Input id="titre" placeholder="Titre de la notification" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Contenu de la notification..."
                  className="rounded-xl min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinataires">Destinataires</Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Sélectionner les destinataires" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les utilisateurs</SelectItem>
                    <SelectItem value="chauffeurs">Chauffeurs uniquement</SelectItem>
                    <SelectItem value="usagers">Usagers uniquement</SelectItem>
                    <SelectItem value="regulateurs">Régulateurs uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                  Envoyer maintenant
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl">
                  Programmer l'envoi
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'incidents'
                ? 'bg-[#007BFF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Incidents</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeTab === 'incidents' ? 'bg-white/20' : 'bg-red-100 text-red-700'
            }`}>
              {incidents.filter((i) => i.statut !== 'resolu').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#007BFF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Notifications</span>
          </button>
        </div>
      </div>

      {activeTab === 'incidents' ? (
        <>
          {/* Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <Label>Filtrer par statut:</Label>
              <Select value={filterStatut} onValueChange={setFilterStatut}>
                <SelectTrigger className="w-48 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="resolu">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Incidents List */}
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      incident.priorite === 'critique' ? 'bg-red-500' :
                      incident.priorite === 'haute' ? 'bg-orange-500' :
                      incident.priorite === 'moyenne' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    } shadow-lg`}>
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[#1A1A1A] text-lg">Incident - Ligne {incident.ligne}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${getTypeBadge(incident.type)}`}>
                          {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs ${getPrioriteBadge(incident.priorite)}`}>
                          Priorité {incident.priorite}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{incident.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Bus className="w-4 h-4" />
                          <span>{incident.bus}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{incident.reportePar}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(incident.dateHeure).toLocaleString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(incident.statut)}`}>
                    {incident.statut === 'en_cours' ? 'En cours' :
                     incident.statut === 'resolu' ? 'Résolu' : 'En attente'}
                  </span>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Button size="sm" className="bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                    Prendre en charge
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Marquer comme résolu
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Envoyer notification
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#1A1A1A] text-lg mb-2">{notification.titre}</h3>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Destinataires: {notification.destinataires}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(notification.dateEnvoi).toLocaleString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(notification.statut)}`}>
                  {notification.statut === 'envoye' ? 'Envoyé' :
                   notification.statut === 'programme' ? 'Programmé' : 'Brouillon'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
