import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  Truck, 
  BarChart3, 
  Package, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Console Administration</h1>
            <p className="text-slate-500 font-medium">Vue d'ensemble de l'écosystème NEKO</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200">Exporter les données</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Gérer les Missions</Button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard 
            title="Utilisateurs Totaux" 
            value="1,284" 
            trend="+12%" 
            trendUp={true}
            icon={<Users className="h-5 w-5 text-blue-600" />} 
          />
          <AdminStatCard 
            title="Collecteurs Actifs" 
            value="24" 
            trend="Stable" 
            trendUp={true}
            icon={<Truck className="h-5 w-5 text-emerald-600" />} 
          />
          <AdminStatCard 
            title="Volume Collecté (T)" 
            value="15.8" 
            trend="+8.2%" 
            trendUp={true}
            icon={<BarChart3 className="h-5 w-5 text-amber-600" />} 
          />
          <AdminStatCard 
            title="Demandes en attente" 
            value="42" 
            trend="-5" 
            trendUp={false}
            icon={<AlertTriangle className="h-5 w-5 text-red-600" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventory / Materials */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Inventaire des Matériaux</CardTitle>
                  <CardDescription>Stock actuel par catégorie (kg)</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-emerald-600">Détails stock</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MaterialProgress label="Plastique PET" value={85} weight="4,250 kg" color="bg-blue-500" />
                  <MaterialProgress label="Papier \u0026 Carton" value={62} weight="2,100 kg" color="bg-amber-500" />
                  <MaterialProgress label="Verre" value={30} weight="1,200 kg" color="bg-emerald-500" />
                  <MaterialProgress label="Métal" value={45} weight="900 kg" color="bg-slate-500" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Global Activity */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Dernières Activités Système</CardTitle>
                <CardDescription>Mises à jour en temps réel des collectes et missions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ActivityRow 
                    user="Koffi Armand" 
                    action="Collecte terminée" 
                    target="REQ-8431 (Papier)" 
                    time="Il y a 5 min"
                    status="SUCCESS"
                  />
                  <ActivityRow 
                    user="Diallo Moussa" 
                    action="Nouvelle mission" 
                    target="Zone Abobo" 
                    time="Il y a 12 min"
                    status="INFO"
                  />
                  <ActivityRow 
                    user="Sery Alice" 
                    action="Signalement bac plein" 
                    target="Bac SB-102" 
                    time="Il y a 45 min"
                    status="WARNING"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg font-bold">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
                  <Truck size={18} /> Assigner un collecteur
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
                  <Users size={18} /> Valider nouveau client
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
                  <TrendingUp size={18} /> Rapport de performance
                </Button>
              </CardContent>
            </Card>

            {/* Live Map Preview */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Flux en direct</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 mb-4 flex items-center justify-center relative overflow-hidden">
                   <MapPin className="text-emerald-600 h-8 w-8 animate-pulse" />
                   <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-700 border border-slate-200">
                     8 CAMIONS ACTIFS
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Efficacité du réseau</span>
                      <span className="font-bold text-emerald-600">94%</span>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[94%]"></div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AdminStatCard({ title, value, icon, trend, trendUp }: { title: string; value: string; icon: React.ReactNode; trend: string; trendUp: boolean }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-slate-50 rounded-xl">{icon}</div>
          <div className={`flex items-center text-xs font-bold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend} {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          </div>
        </div>
        <div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
          <span className="text-2xl font-bold text-slate-900">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function MaterialProgress({ label, value, weight, color }: { label: string; value: number; weight: string; color: string }) {
  return (
    <div className="p-4 border border-slate-100 rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-slate-900">{label}</span>
        <span className="text-xs font-medium text-slate-500">{weight}</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
      </div>
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>Capacité</span>
        <span>{value}%</span>
      </div>
    </div>
  );
}

function ActivityRow({ user, action, target, time, status }: { user: string; action: string; target: string; time: string; status: 'SUCCESS' | 'INFO' | 'WARNING' }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          status === 'SUCCESS' ? 'bg-emerald-500' : status === 'INFO' ? 'bg-blue-500' : 'bg-red-500'
        }`} />
        <div>
          <p className="text-sm font-medium text-slate-900">
            <span className="font-bold">{user}</span> {action}
          </p>
          <p className="text-xs text-slate-500">{target} • {time}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
        <ArrowUpRight size={14} />
      </Button>
    </div>
  );
}
