import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Package, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  History,
  Download,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function InventoryPage() {
  const materials = [
    { name: "Plastique PET", quantity: 4250, unit: "kg", capacity: 5000, value: "1,275,000 F", trend: "+12%", color: "text-blue-600", bg: "bg-blue-600" },
    { name: "Plastique HDPE", quantity: 1800, unit: "kg", capacity: 3000, value: "540,000 F", trend: "+5%", color: "text-sky-500", bg: "bg-sky-500" },
    { name: "Papier \u0026 Carton", quantity: 2100, unit: "kg", capacity: 4000, value: "315,000 F", trend: "+20%", color: "text-amber-600", bg: "bg-amber-600" },
    { name: "Verre", quantity: 1200, unit: "kg", capacity: 5000, value: "240,000 F", trend: "Stable", color: "text-emerald-600", bg: "bg-emerald-600" },
    { name: "Métal / Aluminium", quantity: 900, unit: "kg", capacity: 2000, value: "1,800,000 F", trend: "-2%", color: "text-slate-600", bg: "bg-slate-600" },
    { name: "Compost Produit", quantity: 3500, unit: "kg", capacity: 10000, value: "700,000 F", trend: "+15%", color: "text-orange-700", bg: "bg-orange-700" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestion des Stocks</h1>
            <p className="text-slate-500 font-medium">Inventaire en temps réel des matériaux triés et recyclés</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} /> Rapport
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              <Plus size={16} /> Ajustement manuel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <Card key={m.name} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="mb-2 uppercase tracking-wider text-[10px] font-bold">
                    Disponible
                  </Badge>
                  <span className={`text-xs font-bold ${m.trend.startsWith('+') ? 'text-emerald-600' : m.trend === 'Stable' ? 'text-slate-400' : 'text-red-500'}`}>
                    {m.trend}
                  </span>
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Package className={`h-5 w-5 ${m.color}`} /> {m.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black text-slate-900">{m.quantity.toLocaleString()}</p>
                    <p className="text-sm text-slate-500 font-medium">{m.unit} en stock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{m.value}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Valeur estimée</p>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                    <span>Niveau de capacité</span>
                    <span>{Math.round((m.quantity / m.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(m.quantity / m.capacity) * 100} className="h-2" indicatorClassName={m.bg} />
                </div>

                <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-2 text-sm font-bold">
                  Voir l&#x27;historique des mouvements <ArrowRight size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Movements */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-slate-400" /> Mouvements Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Matériau</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Quantité</th>
                    <th className="px-6 py-3">Source / Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <MovementRow date="31/05 16:45" material="Plastique PET" type="ENTREE" quantity="+45 kg" source="Collecte Abidjan-Sud" />
                  <MovementRow date="31/05 14:20" material="Compost" type="SORTIE" quantity="-200 kg" source="Vente - Ferme Bio" />
                  <MovementRow date="30/05 11:30" material="Métal" type="ENTREE" quantity="+12 kg" source="Point d&#x27;apport volontaire" />
                  <MovementRow date="30/05 09:15" material="Papier" type="ENTREE" quantity="+85 kg" source="Collecte Entreprise" />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function MovementRow({ date, material, type, quantity, source }: { date: string, material: string, type: 'ENTREE' | 'SORTIE', quantity: string, source: string }) {
  return (
    <tr className="bg-white hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-500">{date}</td>
      <td className="px-6 py-4 font-bold text-slate-900">{material}</td>
      <td className="px-6 py-4">
        <Badge className={type === 'ENTREE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}>
          {type}
        </Badge>
      </td>
      <td className={`px-6 py-4 font-bold ${type === 'ENTREE' ? 'text-emerald-600' : 'text-amber-600'}`}>{quantity}</td>
      <td className="px-6 py-4 text-slate-500">{source}</td>
    </tr>
  );
}
