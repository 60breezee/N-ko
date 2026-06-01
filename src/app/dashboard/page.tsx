import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Recycle, 
  TrendingUp, 
  Award, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  PlusCircle, 
  Leaf, 
  Droplets,
  CloudRain,
  Truck
} from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bonjour, Jean ! 👋</h1>
            <p className="text-slate-500 font-medium">Prêt pour votre prochaine collecte ?</p>
          </div>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 h-12 px-6 rounded-xl">
            <Link href="/dashboard/requests/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              Nouvelle Collecte
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Collectes réalisées" 
            value="12" 
            subValue="+2 ce mois"
            icon={<Recycle className="h-5 w-5 text-emerald-600" />} 
          />
          <StatCard 
            title="Score Écologique" 
            value="850" 
            subValue="Top 15% des utilisateurs"
            icon={<TrendingUp className="h-5 w-5 text-blue-600" />} 
          />
          <StatCard 
            title="Points Fidélité" 
            value="2,450" 
            subValue="Niveau Argent"
            icon={<Award className="h-5 w-5 text-amber-500" />} 
          />
          <StatCard 
            title="Poids total collecté" 
            value="128 kg" 
            subValue="85% recyclé"
            icon={<Clock className="h-5 w-5 text-indigo-600" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Impact Section */}
            <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Leaf className="h-5 w-5" /> Votre Impact Environnemental
                </CardTitle>
                <CardDescription className="text-emerald-50/80">
                  Mesuré depuis votre inscription en Janvier 2026
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                  <ImpactItem icon={<Leaf className="h-6 w-6" />} value="8.4" label="Arbres sauvés" />
                  <ImpactItem icon={<Droplets className="h-6 w-6" />} value="420L" label="Eau économisée" />
                  <ImpactItem icon={<CloudRain className="h-6 w-6" />} value="15kg" label="CO2 évité" />
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Prochain Badge: Éco-Héros</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/20" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Collectes Récentes</CardTitle>
                  <CardDescription>Suivi de vos dernières demandes</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700" asChild>
                  <Link href="/dashboard/requests">Voir tout</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RequestItem 
                    id="REQ-8492" 
                    type="Plastique (PET)" 
                    date="Aujourd'hui, 14:00" 
                    status="EN_ATTENTE" 
                    statusLabel="En attente"
                    color="amber"
                  />
                  <RequestItem 
                    id="REQ-8431" 
                    type="Papier & Carton" 
                    date="28 Mai 2026" 
                    status="TERMINE" 
                    statusLabel="Terminé"
                    color="emerald"
                  />
                  <RequestItem 
                    id="REQ-8399" 
                    type="Verre" 
                    date="21 Mai 2026" 
                    status="TERMINE" 
                    statusLabel="Terminé"
                    color="emerald"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="flex flex-col gap-8">
            {/* Real-time Tracking Mock */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" /> Suivi en direct
                </CardTitle>
                <CardDescription>Votre collecteur est en route</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square rounded-xl bg-slate-100 relative overflow-hidden flex items-center justify-center border border-slate-200">
                   <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/2.3484,6.1323,12/400x400?access_token=none')] bg-cover opacity-50 grayscale"></div>
                   <div className="z-10 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex flex-col items-center gap-2">
                     <Truck className="h-8 w-8 text-emerald-600 animate-bounce" />
                     <span className="text-xs font-bold text-slate-900">Camion NEKO-04</span>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">
                    5
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Arrivée estimée : 5 min</p>
                    <p className="text-xs text-slate-500">Distance : 1.2 km</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loyalty / Rewards */}
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-white">Récompenses</CardTitle>
                <CardDescription className="text-slate-400">Échangez vos points contre des cadeaux</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-sm font-bold">Bon d'achat Flooz (1000F)</span>
                     <span className="text-xs text-emerald-400">500 pts</span>
                   </div>
                   <p className="text-xs text-slate-400">Disponible immédiatement</p>
                </div>
                <div className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group opacity-50">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-sm font-bold">Sac de compost Premium</span>
                     <span className="text-xs text-emerald-400">1200 pts</span>
                   </div>
                   <p className="text-xs text-slate-400">En rupture de stock</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, subValue }: { title: string; value: string; icon: React.ReactNode; subValue: string }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-slate-50 rounded-xl">{icon}</div>
          <ArrowUpRight className="h-4 w-4 text-slate-300" />
        </div>
        <div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">{subValue}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ImpactItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-white/10 rounded-full">{icon}</div>
      <div className="text-center">
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-emerald-100/70 uppercase tracking-tighter">{label}</p>
      </div>
    </div>
  );
}

function RequestItem({ id, type, date, statusLabel, color }: { id: string; type: string; date: string; status: string; statusLabel: string; color: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-100 rounded-xl`}>
          <Recycle className={`h-5 w-5 text-${color}-600`} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{type}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{id}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <Badge variant="outline" className={`bg-${color}-50 text-${color}-700 border-${color}-100`}>
        {statusLabel}
      </Badge>
    </div>
  );
}
