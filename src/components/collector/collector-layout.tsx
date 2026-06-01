"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  User, 
  ScanLine, 
  LogOut 
} from "lucide-react";

interface CollectorLayoutProps {
  children: React.ReactNode;
}

export default function CollectorLayout({ children }: CollectorLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden flex-col md:flex-row">
      {/* Mobile-first Sidebar / Header for Desktop */}
      <aside className="hidden md:flex w-20 lg:w-64 flex-col bg-slate-900 text-white p-4">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="bg-emerald-500 p-2 rounded-xl">
             <ScanLine size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold lg:block hidden">NEKO GO</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem href="/collector" icon={<LayoutDashboard size={24} />} label="Missions" active={pathname === "/collector"} />
          <NavItem href="/collector/map" icon={<MapIcon size={24} />} label="Itinéraire" active={pathname === "/collector/map"} />
          <NavItem href="/collector/profile" icon={<User size={24} />} label="Profil" active={pathname === "/collector/profile"} />
        </nav>

        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all w-full mt-auto">
          <LogOut size={24} />
          <span className="lg:block hidden">Déconnexion</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-20 flex items-center justify-around px-2 z-50">
        <MobileNavItem href="/collector" icon={<LayoutDashboard size={24} />} label="Missions" active={pathname === "/collector"} />
        <MobileNavItem href="/collector/map" icon={<MapIcon size={24} />} label="Carte" active={pathname === "/collector/map"} />
        
        {/* Center QR Action */}
        <Link 
          href="/collector/scan" 
          className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white -mt-10 shadow-lg shadow-emerald-200 border-4 border-white active:scale-95 transition-transform"
        >
          <ScanLine size={28} />
        </Link>

        <MobileNavItem href="/collector/notifications" icon={<User size={24} />} label="Profil" active={pathname === "/collector/notifications"} />
        <MobileNavItem href="/collector/settings" icon={<LogOut size={24} />} label="Quitter" active={false} />
      </nav>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        active 
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
          : "text-slate-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span className="lg:block hidden font-medium">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center gap-1 transition-all ${
        active ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </Link>
  );
}
