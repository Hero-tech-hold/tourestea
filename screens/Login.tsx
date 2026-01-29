
import React from 'react';
import { User } from '../types';
import { Mail, Github, Chrome } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleSocialLogin = (provider: string) => {
    // Mock login
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Alex Traveler',
      email: 'alex@example.com',
      photo: 'https://picsum.photos/seed/alex/100/100',
      country: 'USA'
    };
    onLogin(mockUser);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-white">
      <div className="text-center mb-12">
        <div className="bg-teal-50 p-4 rounded-3xl inline-block mb-4">
           <span className="text-4xl">🍵</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome back</h1>
        <p className="text-slate-500 max-w-[200px] mx-auto text-sm">Join the community of honest travelers.</p>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all active:scale-[0.98]"
        >
          <Chrome size={20} className="text-slate-600" />
          <span className="font-bold text-slate-700">Continue with Google</span>
        </button>

        <button 
          onClick={() => handleSocialLogin('github')}
          className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all active:scale-[0.98]"
        >
          <Github size={20} />
          <span className="font-bold">Continue with Github</span>
        </button>

        <div className="flex items-center gap-4 py-4">
          <div className="h-[1px] bg-slate-100 flex-1"></div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">or email</span>
          <div className="h-[1px] bg-slate-100 flex-1"></div>
        </div>

        <button 
          onClick={() => handleSocialLogin('email')}
          className="w-full flex items-center justify-center gap-3 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all active:scale-[0.98]"
        >
          <Mail size={20} className="text-slate-400" />
          <span className="font-bold text-slate-600">Email Address</span>
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 max-w-[250px] leading-relaxed">
          By continuing, you agree to Tourestea's <span className="text-teal-600 underline font-medium cursor-pointer">Terms of Service</span> and <span className="text-teal-600 underline font-medium cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
