import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    setLocation('/painel');
  };

  return (
    <div className="min-h-screen pb-32 pt-24 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-login-title">Entrar</h1>
          <p className="text-muted-foreground">Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="input-password"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              data-testid="link-forgot-password"
            >
              Esqueci minha senha
            </button>
          </div>

          <Button
            type="submit"
            className="w-full hover-elevate active-elevate-2"
            data-testid="button-login"
          >
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
