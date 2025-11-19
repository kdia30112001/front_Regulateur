import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Calendar, Clock, Bus, Plus, Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

const lines = Array.from({ length: 70 }, (_, i) => `Ligne ${i}`);
const buses = ['AA513GC', 'AA873ML', 'AB124KL', 'AA965TR', 'AB301PQ', 'AB567FR', 'AC145MN', 'AC892OP', 'AD234RS', 'AD789TU'];

const scheduledTrips = [
  { id: 1, line: 'Ligne 12', bus: 'AA513GC', time: '08:00', status: 'confirmed' },
  { id: 2, line: 'Ligne 23', bus: 'AA873ML', time: '08:30', status: 'confirmed' },
  { id: 3, line: 'Ligne 45', bus: 'AB124KL', time: '09:00', status: 'pending' },
  { id: 4, line: 'Ligne 12', bus: 'AA965TR', time: '10:00', status: 'confirmed' },
  { id: 5, line: 'Ligne 67', bus: 'AB301PQ', time: '10:30', status: 'pending' },
];

export function PlanificationPage() {
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const handleScheduleTrip = () => {
    if (!selectedLine || !selectedBus || !departureTime || !departureDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    toast.success('Trajet programmé avec succès !', {
      description: `${selectedBus} - ${selectedLine} à ${departureTime}`,
    });

    // Reset form
    setSelectedLine('');
    setSelectedBus('');
    setDepartureTime('');
    setDepartureDate('');
  };

  return (
    <div className="space-y-6">
      {/* Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Planifier un nouveau départ
          </CardTitle>
          <CardDescription>
            Sélectionnez la ligne, le bus et l'heure de départ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="line">Ligne</Label>
              <Select value={selectedLine} onValueChange={setSelectedLine}>
                <SelectTrigger id="line">
                  <SelectValue placeholder="Sélectionnez une ligne" />
                </SelectTrigger>
                <SelectContent>
                  {lines.map((line) => (
                    <SelectItem key={line} value={line}>
                      {line}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bus">Bus</Label>
              <Select value={selectedBus} onValueChange={setSelectedBus}>
                <SelectTrigger id="bus">
                  <SelectValue placeholder="Sélectionnez un bus" />
                </SelectTrigger>
                <SelectContent>
                  {buses.map((bus) => (
                    <SelectItem key={bus} value={bus}>
                      {bus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date de départ</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Heure de départ</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleScheduleTrip}
              className="w-full md:w-auto bg-[#007BFF] hover:bg-[#0056b3]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Programmer le trajet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="w-5 h-5" />
            Trajets programmés
          </CardTitle>
          <CardDescription>Départs planifiés pour aujourd'hui</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#007BFF] rounded-lg flex items-center justify-center">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trip.bus}</span>
                      <Badge variant="outline">{trip.line}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>Départ: {trip.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {trip.status === 'confirmed' ? (
                    <Badge className="bg-green-500">
                      <Check className="w-3 h-3 mr-1" />
                      Confirmé
                    </Badge>
                  ) : (
                    <Badge variant="secondary">En attente</Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {scheduledTrips.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bus className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Aucun trajet programmé</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
