
import React from 'react';
import { 
  LayoutDashboard, Users, BarChart3, UserCircle, Calendar, 
  Camera, Sparkles, Megaphone, Image as ImageIcon, MessageSquare, 
  Settings, Menu
} from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeItem: NavigationItem;
  setActiveItem: (item: NavigationItem) => void;
  maisonName?: string;
}

const navItems: { label: NavigationItem; icon: React.ReactNode }[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'CRM', icon: <Users size={18} /> },
  { label: 'Analysis', icon: <BarChart3 size={18} /> },
  { label: 'Profile', icon: <UserCircle size={18} /> },
  { label: 'Calendar', icon: <Calendar size={18} /> },
  { label: 'Shoots', icon: <Camera size={18} /> },
  { label: 'Events', icon: <Sparkles size={18} /> },
  { label: 'Campaigns', icon: <Megaphone size={18} /> },
  { label: 'Media', icon: <ImageIcon size={18} /> },
  { label: 'Concierge', icon: <MessageSquare size={18} /> },
  { label: 'Settings', icon: <Settings size={18} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, maisonName }) => {
  return (
    <aside className="w-64 border-r border-gray-100 flex flex-col bg-white h-screen">
      <div className="p-8 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold tracking-tight">FashionOS</h1>
        <Menu size={20} className="text-gray-400 cursor-pointer lg:hidden" />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              activeItem === item.label
                ? 'bg-gray-50 text-black font-medium'
                : 'text-gray-400 hover:text-black hover:bg-gray-50'
            }`}
          >
            <span className={activeItem === item.label ? 'text-black' : 'text-gray-400'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        )}
      </nav>

      <div className="p-8 mt-auto border-t border-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src={`https://picsum.photos/seed/${maisonName}/100/100`} alt="Profile" />
          </div>
          <div>
            <p className="text-xs font-semibold text-black uppercase tracking-widest truncate w-32">
              {maisonName || "L'Artisan"}
            </p>
            <p className="text-[10px] text-gray-400">MAISON TIERS I</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
