"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Recycle, LayoutDashboard, Truck, History, Award, Settings, LogOut, Menu, Bell, User, ShieldCheck, Package, ShoppingBag, CreditCard, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r shadow-sm">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">NEKO</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Principal</div>
          <SidebarItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Tableau de bord" active={pathname === "/dashboard"} />
          
          {isAdmin && (
            <>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-6 mb-2">Administration</div>
              <SidebarItem href="/admin" icon={<ShieldCheck size={20} />} label="Console Globale" active={pathname === "/admin"} />
              <SidebarItem href="/admin/inventory" icon={<Package size={20} />} label="Gestion Stocks" active={pathname === "/admin/inventory"} />
              <SidebarItem href="/admin/marketplace" icon={<ShoppingBag size={20} />} label="Marketplace" active={pathname === "/admin/marketplace"} />
              <SidebarItem href="/admin/collectors" icon={<Users size={20} />} label="Collecteurs" active={pathname === "/admin/collectors"} />
            </>
          )}

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-6 mb-2">Collectes</div>
          <SidebarItem href="/dashboard/requests" icon={<Truck size={20} />} label="Mes collectes" active={pathname.startsWith("/dashboard/requests")} />
          <SidebarItem href="/dashboard/history" icon={<History size={20} />} label="Historique" active={pathname === "/dashboard/history"} />
          <SidebarItem href="/dashboard/signalement" icon={<AlertTriangle size={20} />} label="Signalements" active={pathname === "/dashboard/signalement"} />

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-6 mb-2">Compte</div>
          <SidebarItem href="/dashboard/passport" icon={<Award size={20} />} label="Passeport Éco" active={pathname === "/dashboard/passport"} />
          <SidebarItem href="/dashboard/subscriptions" icon={<CreditCard size={20} />} label="Abonnements" active={pathname === "/dashboard/subscriptions"} />
          <SidebarItem href="/dashboard/settings" icon={<Settings size={20} />} label="Paramètres" active={pathname === "/dashboard/settings"} />
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 gap-3"
            onClick={() => signOut()}
          >
            <LogOut size={20} />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
            <span className="font-bold text-xl">NEKO</span>
          </div>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wider">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="p-0 hover:bg-transparent focus-visible:ring-0" />
                }
              >
                <Avatar className="h-9 w-9 border-2 border-emerald-50">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/settings")}>
                  <User size={16} /> Profil
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/passport")}>
                  <Award size={16} /> Points Fidélité
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="gap-2 text-red-600 cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} /> Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? "bg-emerald-50 text-emerald-700 shadow-sm" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
