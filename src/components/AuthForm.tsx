
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface AuthFormProps {
  visible: boolean;
}

const AuthForm = ({
  visible
}: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isLogin ? 'Logging in' : 'Signing up'} with:`, {
      email,
      password
    });
    
    // Show success toast
    toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    
    // Navigate to dashboard after successful login
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center ${visible ? 'animate-slide-up' : 'opacity-0'}`}>
      {/* Logo header */}
      <div className="mb-8 opacity-0 animate-slide-up" style={{
        animationDelay: '300ms',
        animationFillMode: 'forwards'
      }}>
        <div className="text-5xl font-hanson tracking-wider text-white font-bold">
          altyou
        </div>
      </div>
      
      {/* Auth card */}
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10 shadow-lg opacity-0 animate-slide-up" style={{
        animationDelay: '500ms',
        animationFillMode: 'forwards'
      }}>
        <h2 className="text-2xl font-medium text-center mb-8 text-white">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 text-base pl-1">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-white/40 focus-visible:ring-1 focus-visible:ring-white/30" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 text-base pl-1">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-white/40 focus-visible:ring-1 focus-visible:ring-white/30" 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white hover:bg-white/90 text-[#222222] font-medium py-6 h-12"
          >
            {isLogin ? 'Sign in' : 'Sign up'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-white hover:text-white/80 underline underline-offset-4 font-medium transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
