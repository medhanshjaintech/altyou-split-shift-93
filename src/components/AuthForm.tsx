
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface AuthFormProps {
  visible: boolean;
}

const AuthForm = ({
  visible
}: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isLogin ? 'Logging in' : 'Signing up'} with:`, {
      email,
      password
    });
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center ${visible ? 'animate-fade-in' : 'animate-fade-out'}`}>
      {/* Logo header */}
      <div className={`mb-8 animate-slide-up [animation-delay:300ms] opacity-0`}>
        <div className="text-3xl font-hanson tracking-wider">
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            altyou
          </span>
        </div>
      </div>
      
      {/* Auth card */}
      <div className="w-full max-w-md p-8 rounded-xl glass-card animate-slide-up [animation-delay:500ms] opacity-0">
        <h2 className="text-2xl font-medium text-center mb-6">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="bg-white/5 border-white/10" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="bg-white/5 border-white/10" />
          </div>
          
          <Button type="submit" className="w-full">
            {isLogin ? 'Sign in' : 'Sign up'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
