import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Tag, 
  Users, 
  BarChart, 
  Plus, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function MarketplacePage() {
  const listings = [
    { id: "LST-101", title: "Lot Plastique PET Broyé", weight: "2,000 kg", price: "600,000 F", status: "PUBLISHED", buyer: "Eco-Plastic S.A." },
    { id: "LST-102", title: "Carton Compressé - Qualité A", weight: "5,000 kg", price: "750,000 F", status: "SOLD", buyer: "Ivoir-Papier" },
    { id: "LST-103", title: "Compost Organique Premium", weight: "1,500 kg", price: "300,000 F", status: "PUBLISHED", buyer: "Ferme du Littoral" },
    { id: "LST-104", title: "Canettes Aluminium Compactées", weight: "800 kg", price: "1,600,000 F", status: "DRAFT", buyer: "N/A" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Marketplace</h1>
            <p className="text-slate-500 font-medium">Vente de matériaux recyclés aux partenaires industriels</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Plus size={16} /> Créer une annonce
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Rechercher une annonce, un acheteur..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filtres
          </Button>
        </div>

        {/* Listings Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Annonces de vente</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Annonce</th>
                    <th className="px-6 py-3">Poids</th>
                    <th className="px-6 py-3">Prix</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Acheteur</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((lst) => (
                    <tr key={lst.id} className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{lst.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{lst.title}</td>
                      <td className="px-6 py-4 font-medium">{lst.weight}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">{lst.price}</td>
                      <td className="px-6 py-4">
                        <Badge className={
                          lst.status === 'PUBLISHED' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          lst.status === 'SOLD' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          'bg-slate-50 text-slate-700 border-slate-100'
                        }>
                          {lst.status === 'PUBLISHED' ? 'Publié' : lst.status === 'SOLD' ? 'Vendu' : 'Brouillon'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{lst.buyer}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-600">
                          <ExternalLink size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketStat 
            title="Revenus Ventes (Mensuel)" 
            value="4,850,000 F" 
            trend="+15%" 
            icon={<Tag className="h-5 w-5 text-emerald-600" />} 
          />
          <MarketStat 
            title="Acheteurs Actifs" 
            value="12" 
            trend="+2" 
            icon={<Users className="h-5 w-5 text-blue-600" />} 
          />
          <MarketStat 
            title="Taux de Rotation" 
            value="78%" 
            trend="+5%" 
            icon={<BarChart className="h-5 w-5 text-amber-600" />} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function MarketStat({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">{value}</span>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              {trend}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
