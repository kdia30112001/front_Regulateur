import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User, Mail, Phone, Shield, LogOut, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface ProfilePageProps {
  onLogout: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [name, setName] = useState('Modou Ndiaye');
  const [email, setEmail] = useState('regulateur@yoonubus.sn');
  const [phone, setPhone] = useState('+221 77 123 45 67');

  const handleSaveProfile = () => {
    toast.success('Profil mis à jour avec succès');
  };

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-[#007BFF] text-white text-2xl">
                MN
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl">{name}</h2>
              <p className="text-gray-600">Régulateur principal</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-green-500">Actif</Badge>
                <Badge variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  Administrateur
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>Gérez vos informations de profil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input id="role" value="Régulateur principal" disabled />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveProfile}
              className="bg-[#007BFF] hover:bg-[#0056b3]"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques d'activité</CardTitle>
          <CardDescription>Votre performance ce mois-ci</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Trajets planifiés</p>
              <p className="text-2xl mt-1">847</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Incidents gérés</p>
              <p className="text-2xl mt-1">32</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Affectations créées</p>
              <p className="text-2xl mt-1">156</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sécurité
          </CardTitle>
          <CardDescription>Gérez vos paramètres de sécurité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Mot de passe</p>
              <p className="text-sm text-gray-600">
                Dernière modification il y a 30 jours
              </p>
            </div>
            <Button variant="outline">Changer le mot de passe</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Authentification à deux facteurs</p>
              <p className="text-sm text-gray-600">
                Ajoutez une couche de sécurité supplémentaire
              </p>
            </div>
            <Button variant="outline">Configurer</Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-600">Déconnexion</h3>
              <p className="text-sm text-gray-600">
                Se déconnecter de votre session actuelle
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs";
  const variantStyles = variant === 'outline' 
    ? "border border-gray-300 text-gray-700" 
    : className || "bg-blue-500 text-white";
  
  return (
    <span className={`${baseStyles} ${variantStyles}`}>
      {children}
    </span>
  );
}
