
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../types';
import { Home, Search, PlusCircle, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 z-50 flex justify-between items-center max-w-md mx-auto">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-teal-600 font-semibold' : 'text-slate-500'}`}>
        <Home size={24} />
        <span className="text-[10px]">Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-teal-600 font-semibold' : 'text-slate-500'}`}>
        <Search size={24} />
        <span className="text-[10px]">Search</span>
      </NavLink>
      <NavLink to="/create" className={({ isActive }) => `flex flex-col items-center gap-1 -mt-8 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors`}>
        <PlusCircle size={28} />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-teal-600 font-semibold' : 'text-slate-500'}`}>
        <UserIcon size={24} />
        <span className="text-[10px]">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
