import { User, Mail, Shield, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';

interface AdminProfileProps {
  onNavigate: (page: 'dashboard' | 'users' | 'trajets' | 'historique' | 'profile') => void;
}

export function AdminProfile({ onNavigate }: AdminProfileProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A1A] text-3xl mb-2">Mon Profil</h1>
        <p className="text-gray-600">Gérer vos informations personnelles et paramètres</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center shadow-xl mb-6">
                <User className="w-16 h-16 text-white" />
              </div>

              {/* User Info */}
              <h2 className="text-[#1A1A1A] text-2xl mb-2">Cheikh Kane</h2>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-[#007BFF]" />
                <span className="text-gray-600">Administrateur Principal</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Mail className="w-4 h-4" />
                <span className="text-sm">c.kane@yoonubus.sn</span>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-3">
                <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-xl gap-2">
                  <Edit className="w-4 h-4" />
                  Modifier le profil
                </Button>
                <Button variant="outline" className="w-full border-gray-300 rounded-xl gap-2">
                  <Settings className="w-4 h-4" />
                  Paramètres
                </Button>
                <Button variant="destructive" className="w-full rounded-xl gap-2">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-[#1A1A1A] text-xl mb-6">Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Prénom</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  Cheikh
                </div>
              </div>
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Nom</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  Kane
                </div>
              </div>
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Email</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  c.kane@yoonubus.sn
                </div>
              </div>
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Téléphone</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  +221 77 123 45 67
                </div>
              </div>
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Rôle</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  Administrateur Principal
                </div>
              </div>
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Date d'inscription</label>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-[#1A1A1A]">
                  15 Janvier 2024
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-[#1A1A1A] text-xl mb-6">Statistiques d'Activité</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-[#007BFF] rounded-lg flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-blue-700">Total</span>
                </div>
                <p className="text-3xl text-[#1A1A1A] mb-1">1,247</p>
                <p className="text-blue-700 text-sm">Utilisateurs gérés</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-[#FFD43B] rounded-lg flex items-center justify-center shadow-md">
                    <Edit className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-xs text-yellow-700">Cette semaine</span>
                </div>
                <p className="text-3xl text-[#1A1A1A] mb-1">89</p>
                <p className="text-yellow-700 text-sm">Modifications</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-green-700">Ce mois</span>
                </div>
                <p className="text-3xl text-[#1A1A1A] mb-1">156</p>
                <p className="text-green-700 text-sm">Actions effectuées</p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-[#1A1A1A] text-xl mb-6">Permissions & Accès</h3>
            <div className="space-y-3">
              {[
                { label: 'Gestion des utilisateurs', enabled: true },
                { label: 'Gestion des trajets et bus', enabled: true },
                { label: 'Accès aux rapports et historiques', enabled: true },
                { label: 'Configuration système', enabled: true },
                { label: 'Gestion des rôles (RBAC)', enabled: true },
              ].map((permission, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <span className="text-[#1A1A1A]">{permission.label}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      permission.enabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {permission.enabled ? 'Activé' : 'Désactivé'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-left transition-all"
              >
                Retour au Dashboard
              </button>
              <button
                onClick={() => onNavigate('users')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-left transition-all"
              >
                Gérer les utilisateurs
              </button>
              <button
                onClick={() => onNavigate('trajets')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-left transition-all"
              >
                Voir les trajets
              </button>
              <button
                onClick={() => onNavigate('historique')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-left transition-all"
              >
                Consulter l'historique
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
