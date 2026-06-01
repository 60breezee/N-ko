"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Recycle, LayoutDashboard, Truck, History, Award, Settings, LogOut,
  Menu, Bell, User, ShieldCheck, Package, ShoppingBag, CreditCard,
  AlertTriangle, Users, Warehouse, Tractor, Landmark, Building2,
  ScanLine, Map, ClipboardList
} from "lucide-react";
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

const ROLE_CONFIG: Record<string, { label: string; nav: { href: string; icon: React.ReactNode; label: string; section: string }[] }> = {
  CLIENT_INDIVIDUAL: {
    label: "Particulier",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/dashboard/requests", icon: <Truck size={20} />, label: "Mes collectes", section: "Collectes" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Collectes" },
      { href: "/dashboard/signalement", icon: <AlertTriangle size={20} />, label: "Signalements", section: "Collectes" },
      { href: "/dashboard/passport", icon: <Award size={20} />, label: "Passeport Éco", section: "Compte" },
      { href: "/dashboard/subscriptions", icon: <CreditCard size={20} />, label: "Abonnements", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  CLIENT_COMPANY: {
    label: "Entreprise",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/dashboard/requests", icon: <Truck size={20} />, label: "Collectes", section: "Collectes" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Collectes" },
      { href: "/admin/marketplace", icon: <ShoppingBag size={20} />, label: "Marketplace", section: "Commerce" },
      { href: "/dashboard/subscriptions", icon: <CreditCard size={20} />, label: "Contrats", section: "Compte" },
      { href: "/dashboard/reports", icon: <ClipboardList size={20} />, label: "Rapports", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  COLLECTOR: {
    label: "Collecteur",
    nav: [
      { href: "/collector", icon: <LayoutDashboard size={20} />, label: "Missions", section: "Principal" },
      { href: "/collector/map", icon: <Map size={20} />, label: "Itinéraire", section: "Principal" },
      { href: "/collector/scan", icon: <ScanLine size={20} />, label: "Scanner", section: "Principal" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Compte" },
      { href: "/dashboard/passport", icon: <Award size={20} />, label: "Points", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  SORTING_AGENT: {
    label: "Agent de tri",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/dashboard/reception", icon: <Package size={20} />, label: "Réception", section: "Traitement" },
      { href: "/admin/inventory", icon: <Warehouse size={20} />, label: "Stock", section: "Traitement" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  FARMER: {
    label: "Agriculteur",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/dashboard/requests", icon: <Truck size={20} />, label: "Collectes", section: "Collectes" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Collectes" },
      { href: "/dashboard/passport", icon: <Award size={20} />, label: "Bilan Carbone", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  BUYER: {
    label: "Acheteur",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/admin/marketplace", icon: <ShoppingBag size={20} />, label: "Marketplace", section: "Achats" },
      { href: "/dashboard/orders", icon: <Package size={20} />, label: "Mes commandes", section: "Achats" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
  MUNICIPALITY: {
    label: "Municipalité",
    nav: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord", section: "Principal" },
      { href: "/dashboard/requests", icon: <Truck size={20} />, label: "Collectes", section: "Service" },
      { href: "/dashboard/reports", icon: <ClipboardList size={20} />, label: "Rapports", section: "Service" },
      { href: "/dashboard/history", icon: <History size={20} />, label: "Historique", section: "Compte" },
      { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Paramètres", section: "Compte" },
    ],
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as any;
  const role = user?.role || "CLIENT_INDIVIDUAL";
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.CLIENT_INDIVIDUAL;
  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "??";

  const adminNav = [
    { href: "/admin", icon: <ShieldCheck size={20} />, label: "Console Globale", section: "Administration" },
    { href: "/admin/inventory", icon: <Package size={20} />, label: "Gestion Stocks", section: "Administration" },
    { href: "/admin/marketplace", icon: <ShoppingBag size={20} />, label: "Marketplace", section: "Administration" },
    { href: "/admin/collectors", icon: <Users size={20} />, label: "Collecteurs", section: "Administration" },
  ];

  const grouped: Record<string, typeof config.nav> = {};
  config.nav.forEach((item) => {
    const existing = grouped[item.section] || [];
    existing.push(item);
    grouped[item.section] = existing;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r shadow-sm">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">NEKO</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-6 first:mt-0">
                {section}
              </div>
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href)
                  }
                />
              ))}
            </div>
          ))}

          {isAdmin && (
            <>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-6 mb-2">
                Administration
              </div>
              {adminNav.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname.startsWith(item.href)}
                />
              ))}
            </>
          )}
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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
            <span className="font-bold text-xl">NEKO</span>
          </div>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-slate-800 uppercase tracking-wider">
              {config.label}
            </h2>
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
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.name || "Mon Compte"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/settings")}>
                  <User size={16} /> Profil
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/passport")}>
                  <Award size={16} /> Passeport Éco
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
