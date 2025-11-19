import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface User {
  id: string;
  nom: string;
  prenom: string;
  role: 'usager' | 'chauffeur' | 'regulateur' | 'admin';
  email: string;
  statut: 'actif' | 'bloque';
}

const mockUsers: User[] = [
  { id: '1', nom: 'Diop', prenom: 'Moussa', role: 'chauffeur', email: 'm.diop@yoonubus.sn', statut: 'actif' },
  { id: '2', nom: 'Ndiaye', prenom: 'Fatou', role: 'usager', email: 'f.ndiaye@gmail.com', statut: 'actif' },
  { id: '3', nom: 'Fall', prenom: 'Amadou', role: 'regulateur', email: 'a.fall@yoonubus.sn', statut: 'actif' },
  { id: '4', nom: 'Sow', prenom: 'Ibrahima', role: 'chauffeur', email: 'i.sow@yoonubus.sn', statut: 'actif' },
  { id: '5', nom: 'Ba', prenom: 'Aissatou', role: 'usager', email: 'a.ba@hotmail.com', statut: 'bloque' },
  { id: '6', nom: 'Sarr', prenom: 'Ousmane', role: 'chauffeur', email: 'o.sarr@yoonubus.sn', statut: 'actif' },
  { id: '7', nom: 'Sy', prenom: 'Marieme', role: 'regulateur', email: 'm.sy@yoonubus.sn', statut: 'actif' },
  { id: '8', nom: 'Kane', prenom: 'Cheikh', role: 'admin', email: 'c.kane@yoonubus.sn', statut: 'actif' },
];

export function UsersManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const getRoleBadge = (role: string) => {
    const colors = {
      usager: 'bg-blue-100 text-blue-700',
      chauffeur: 'bg-green-100 text-green-700',
      regulateur: 'bg-purple-100 text-purple-700',
      admin: 'bg-red-100 text-red-700',
    };
    return colors[role as keyof typeof colors] || colors.usager;
  };

  const getStatutBadge = (statut: string) => {
    return statut === 'actif'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A1A] text-3xl mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérer tous les utilisateurs de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg rounded-xl gap-2">
                <Shield className="w-4 h-4" />
                Modifier RBAC
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Gestion des Rôles et Permissions</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-gray-600">Interface de configuration RBAC (Role-Based Access Control)</p>
                {/* RBAC configuration would go here */}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white shadow-lg rounded-xl gap-2">
                <Plus className="w-4 h-4" />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un utilisateur</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" placeholder="Nom de famille" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" placeholder="Prénom" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usager">Usager</SelectItem>
                      <SelectItem value="chauffeur">Chauffeur</SelectItem>
                      <SelectItem value="regulateur">Régulateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-xl">
                  Créer l'utilisateur
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Nom & Prénom
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Rôle
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-[#1A1A1A]">{user.prenom} {user.nom}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadge(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatutBadge(user.statut)}`}>
                      {user.statut === 'actif' ? 'Actif' : 'Bloqué'}
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
