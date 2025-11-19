import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { AlertTriangle, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

const incidents = [
  {
    id: 1,
    bus: 'AB301PQ',
    driver: 'Ibrahima Ndiaye',
    type: 'Panne mécanique',
    description: 'Problème de moteur, bus immobilisé à l\'arrêt Plateau',
    priority: 'high',
    status: 'open',
    time: 'Il y a 15 min',
    timestamp: '14:45',
  },
  {
    id: 2,
    bus: 'AA873ML',
    driver: 'Mamadou Diop',
    type: 'Retard',
    description: 'Embouteillage important sur la route',
    priority: 'medium',
    status: 'open',
    time: 'Il y a 30 min',
    timestamp: '14:30',
  },
  {
    id: 3,
    bus: 'AB567FR',
    driver: 'Fatou Sall',
    type: 'Embouteillage',
    description: 'Circulation dense, retard prévu de 10 minutes',
    priority: 'low',
    status: 'in-progress',
    time: 'Il y a 1h',
    timestamp: '14:00',
  },
  {
    id: 4,
    bus: 'AB124KL',
    driver: 'Ousmane Fall',
    type: 'Comportement passager',
    description: 'Passager perturbateur, situation gérée',
    priority: 'medium',
    status: 'resolved',
    time: 'Il y a 2h',
    timestamp: '13:00',
  },
  {
    id: 5,
    bus: 'AA965TR',
    driver: 'Aissatou Ba',
    type: 'Accident mineur',
    description: 'Accrochage léger, pas de blessés',
    priority: 'high',
    status: 'resolved',
    time: 'Il y a 3h',
    timestamp: '12:00',
  },
];

export function IncidentsPage() {
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);
  const [response, setResponse] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

  const filteredIncidents = filter === 'all'
    ? incidents
    : incidents.filter(inc => inc.status === filter);

  const handleSendResponse = () => {
    if (!response) {
      toast.error('Veuillez saisir une réponse');
      return;
    }

    toast.success('Instructions envoyées au chauffeur');
    setResponse('');
    setSelectedIncident(null);
  };

  const handleResolve = (id: number) => {
    toast.success('Incident marqué comme résolu');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Urgent';
      case 'medium':
        return 'Moyen';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Nouveau';
      case 'in-progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-2xl">{incidents.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Nouveaux</CardDescription>
            <CardTitle className="text-2xl text-red-600">
              {incidents.filter(i => i.status === 'open').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>En cours</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">
              {incidents.filter(i => i.status === 'in-progress').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Résolus</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {incidents.filter(i => i.status === 'resolved').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-[#007BFF] hover:bg-[#0056b3]' : ''}
        >
          Tous
        </Button>
        <Button
          variant={filter === 'open' ? 'default' : 'outline'}
          onClick={() => setFilter('open')}
          className={filter === 'open' ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          Nouveaux
        </Button>
        <Button
          variant={filter === 'in-progress' ? 'default' : 'outline'}
          onClick={() => setFilter('in-progress')}
          className={filter === 'in-progress' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        >
          En cours
        </Button>
        <Button
          variant={filter === 'resolved' ? 'default' : 'outline'}
          onClick={() => setFilter('resolved')}
          className={filter === 'resolved' ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          Résolus
        </Button>
      </div>

      {/* Incidents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Signalements d'incidents
          </CardTitle>
          <CardDescription>
            Notifications en temps réel des chauffeurs et receveurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-4 bg-gray-50 rounded-lg border-l-4"
                style={{ borderLeftColor: incident.priority === 'high' ? '#ef4444' : incident.priority === 'medium' ? '#eab308' : '#3b82f6' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{incident.bus}</Badge>
                      <Badge className={getPriorityColor(incident.priority)}>
                        {getPriorityLabel(incident.priority)}
                      </Badge>
                      <Badge className={getStatusColor(incident.status)}>
                        {getStatusIcon(incident.status)}
                        <span className="ml-1">{getStatusLabel(incident.status)}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{incident.type}</p>
                      <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Chauffeur: {incident.driver}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {incident.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedIncident(incident)}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Répondre
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Envoyer des instructions</DialogTitle>
                          <DialogDescription>
                            {incident.bus} - {incident.type}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm mb-2">Description de l'incident:</p>
                            <p className="text-sm bg-gray-100 p-3 rounded">
                              {incident.description}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm">Votre réponse:</label>
                            <Textarea
                              placeholder="Entrez vos instructions pour le chauffeur..."
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSendResponse}
                              className="bg-[#007BFF] hover:bg-[#0056b3]"
                            >
                              Envoyer
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {incident.status !== 'resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50"
                        onClick={() => handleResolve(incident.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Résoudre
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredIncidents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Aucun incident {filter !== 'all' ? getStatusLabel(filter).toLowerCase() : ''}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
