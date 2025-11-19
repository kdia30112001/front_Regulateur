import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Users, UserCheck, Bus, Send } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';

const drivers = [
  { id: 1, name: 'Mamadou Diop', status: 'available' },
  { id: 2, name: 'Ibrahima Ndiaye', status: 'assigned' },
  { id: 3, name: 'Ousmane Fall', status: 'available' },
  { id: 4, name: 'Abdou Seck', status: 'available' },
  { id: 5, name: 'Moustapha Sarr', status: 'assigned' },
  { id: 6, name: 'Cheikh Diallo', status: 'available' },
  { id: 7, name: 'Lamine Cissé', status: 'available' },
  { id: 8, name: 'Babacar Kane', status: 'available' },
];

const conductors = [
  { id: 1, name: 'Aminata Sy', status: 'available' },
  { id: 2, name: 'Mariama Diouf', status: 'available' },
  { id: 3, name: 'Cheikh Mbaye', status: 'assigned' },
  { id: 4, name: 'Ndèye Thiam', status: 'available' },
  { id: 5, name: 'Moussa Kane', status: 'available' },
  { id: 6, name: 'Awa Niang', status: 'available' },
];

const buses = ['AA513GC', 'AA873ML', 'AB124KL', 'AA965TR', 'AB301PQ', 'AB567FR'];
const lines = ['Ligne 12', 'Ligne 23', 'Ligne 45', 'Ligne 67', 'Ligne 8', 'Ligne 34', 'Ligne 56'];

const assignments = [
  {
    id: 1,
    bus: 'AA513GC',
    line: 'Ligne 12',
    driver: 'Ibrahima Ndiaye',
    conductor: 'Aminata Sy',
    status: 'active',
  },
  {
    id: 2,
    bus: 'AA873ML',
    line: 'Ligne 23',
    driver: 'Moustapha Sarr',
    conductor: 'Mariama Diouf',
    status: 'active',
  },
  {
    id: 3,
    bus: 'AB124KL',
    line: 'Ligne 45',
    driver: 'Mamadou Diop',
    conductor: 'Ndèye Thiam',
    status: 'active',
  },
];

export function AffectationPage() {
  const [selectedBus, setSelectedBus] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedConductor, setSelectedConductor] = useState('');

  const handleAssign = () => {
    if (!selectedBus || !selectedLine || !selectedDriver || !selectedConductor) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    toast.success('Affectation créée avec succès !', {
      description: 'Notifications envoyées au chauffeur et au receveur',
    });

    // Reset form
    setSelectedBus('');
    setSelectedLine('');
    setSelectedDriver('');
    setSelectedConductor('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Nouvelle affectation
          </CardTitle>
          <CardDescription>
            Assignez un chauffeur et un receveur à un bus et une ligne
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="driver">Chauffeur</Label>
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger id="driver">
                  <SelectValue placeholder="Sélectionnez un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  {drivers
                    .filter((d) => d.status === 'available')
                    .map((driver) => (
                      <SelectItem key={driver.id} value={driver.name}>
                        {driver.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conductor">Receveur</Label>
              <Select value={selectedConductor} onValueChange={setSelectedConductor}>
                <SelectTrigger id="conductor">
                  <SelectValue placeholder="Sélectionnez un receveur" />
                </SelectTrigger>
                <SelectContent>
                  {conductors
                    .filter((c) => c.status === 'available')
                    .map((conductor) => (
                      <SelectItem key={conductor.id} value={conductor.name}>
                        {conductor.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleAssign}
              className="w-full md:w-auto bg-[#007BFF] hover:bg-[#0056b3]"
            >
              <Send className="w-4 h-4 mr-2" />
              Créer l'affectation et notifier
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Drivers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Chauffeurs disponibles
            </CardTitle>
            <CardDescription>
              {drivers.filter((d) => d.status === 'available').length} chauffeurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#007BFF] text-white">
                        {getInitials(driver.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                    </div>
                  </div>
                  <Badge
                    variant={driver.status === 'available' ? 'default' : 'secondary'}
                    className={
                      driver.status === 'available'
                        ? 'bg-green-500'
                        : ''
                    }
                  >
                    {driver.status === 'available' ? 'Disponible' : 'Affecté'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Conductors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Receveurs disponibles
            </CardTitle>
            <CardDescription>
              {conductors.filter((c) => c.status === 'available').length} receveurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conductors.map((conductor) => (
                <div
                  key={conductor.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#FFD43B] text-gray-900">
                        {getInitials(conductor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{conductor.name}</p>
                    </div>
                  </div>
                  <Badge
                    variant={conductor.status === 'available' ? 'default' : 'secondary'}
                    className={
                      conductor.status === 'available'
                        ? 'bg-green-500'
                        : ''
                    }
                  >
                    {conductor.status === 'available' ? 'Disponible' : 'Affecté'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="w-5 h-5" />
            Affectations actives
          </CardTitle>
          <CardDescription>Personnel actuellement en service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 px-4">Bus</th>
                  <th className="pb-3 px-4">Ligne</th>
                  <th className="pb-3 px-4">Chauffeur</th>
                  <th className="pb-3 px-4">Receveur</th>
                  <th className="pb-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <Badge variant="outline">{assignment.bus}</Badge>
                    </td>
                    <td className="py-3 px-4">{assignment.line}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#007BFF] text-white text-xs">
                            {getInitials(assignment.driver)}
                          </AvatarFallback>
                        </Avatar>
                        {assignment.driver}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#FFD43B] text-gray-900 text-xs">
                            {getInitials(assignment.conductor)}
                          </AvatarFallback>
                        </Avatar>
                        {assignment.conductor}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500">En service</Badge>
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
