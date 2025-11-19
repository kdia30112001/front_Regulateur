import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bus, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (email && password) {
        toast.success('Connexion réussie !');
        onLogin();
      } else {
        toast.error('Veuillez remplir tous les champs');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-[#007BFF] rounded-full flex items-center justify-center">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">YoonuBus Bi</CardTitle>
          <CardDescription>Dashboard Régulateur</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="regulateur@yoonubus.sn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#007BFF] hover:underline"
                onClick={() => toast.info('Contactez l\'administrateur système')}
              >
                Mot de passe oublié ?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#0056b3]"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
