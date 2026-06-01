import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Zap, Leaf, Droplets, CloudRain, Trash2, Milestone, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PassportPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {/* Passport Header */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 p-1">
              <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Jean')] bg-cover"></div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold">Jean Dupont</h1>
                <Badge className="bg-emerald-500 hover:bg-emerald-500 border-none">Niveau Argent</Badge>
              </div>
              <p className="text-slate-400 font-medium mb-4">Membre depuis Janvier 2026 • ID: NEKO-942-88</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">2,450 points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400 fill-blue-400" />
                  <span className="font-bold">850 Score Éco</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Rang Mondial</p>
              <p className="text-3xl font-bold text-emerald-400">#1,242</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Impact */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Milestone className="h-5 w-5 text-emerald-600" /> Progression du niveau
                </CardTitle>
                <CardDescription>Plus que 550 points pour atteindre le niveau Or</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Argent</span>
                    <span>75%</span>
                    <span>Or</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Missions</p>
                    <p className="text-xl font-bold text-slate-900">12/20</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Parrainages</p>
                    <p className="text-xl font-bold text-slate-900">3/5</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Série active</p>
                    <p className="text-xl font-bold text-slate-900">4 sem.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Impact Détaillé</CardTitle>
                <CardDescription>Visualisez concrètement vos actions pour la planète</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <ImpactStat icon={<Trash2 className="text-slate-600" />} label="Déchets collectés" value="128" unit="kg" />
                  <ImpactStat icon={<Leaf className="text-emerald-600" />} label="Arbres sauvés" value="8.4" unit="arbres" />
                  <ImpactStat icon={<Droplets className="text-blue-600" />} label="Eau préservée" value="420" unit="litres" />
                  <ImpactStat icon={<CloudRain className="text-indigo-600" />} label="CO2 évité" value="15.2" unit="kg" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges / Achievements */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" /> Vos Badges
                </CardTitle>
                <CardDescription>12 badges débloqués</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <BadgeItem active icon="🌱" name="Premier Pas" />
                  <BadgeItem active icon="♻️" name="Recycleur" />
                  <BadgeItem active icon="🔥" name="Série 1 sem" />
                  <BadgeItem active icon="🚲" name="Éco-Mobile" />
                  <BadgeItem active icon="📦" name="Gros Volume" />
                  <BadgeItem active icon="⭐" name="Top 10%" />
                  <BadgeItem icon="👑" name="Légende" />
                  <BadgeItem icon="🌍" name="Sauveur" />
                  <BadgeItem icon="🚀" name="Pionnier" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
              <CardHeader>
                <CardTitle className="text-white">Défis en cours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recycler 10kg de plastique</p>
                  <Progress value={80} className="h-1.5 bg-white/20" />
                  <p className="text-right text-xs text-indigo-100">8kg / 10kg</p>
                </div>
                <Separator className="bg-white/10" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Faire 3 collectes en 7 jours</p>
                  <Progress value={33} className="h-1.5 bg-white/20" />
                  <p className="text-right text-xs text-indigo-100">1 / 3</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ImpactStat({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value} <span className="text-sm font-normal text-slate-400">{unit}</span></p>
      </div>
    </div>
  );
}

function BadgeItem({ active = false, icon, name }: { active?: boolean; icon: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-help">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
        active ? "bg-emerald-50 shadow-sm border border-emerald-100" : "bg-slate-50 grayscale opacity-40 border border-transparent"
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold text-center uppercase tracking-tighter ${active ? "text-slate-700" : "text-slate-400"}`}>
        {name}
      </span>
    </div>
  );
}
