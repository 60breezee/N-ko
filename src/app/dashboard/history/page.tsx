import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const history = [
    { id: 1, type: "Gain de points", amount: "+50 pts", desc: "Recyclage Plastique PET", date: "31 Mai 2026", trend: "up" },
    { id: 2, type: "Récompense", amount: "-500 pts", desc: "Bon d'achat Flooz", date: "25 Mai 2026", trend: "down" },
    { id: 3, type: "Gain de points", amount: "+35 pts", desc: "Recyclage Papier", date: "21 Mai 2026", trend: "up" },
    { id: 4, type: "Gain de points", amount: "+120 pts", desc: "Recyclage Verre", date: "15 Mai 2026", trend: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Historique</h1>
            <p className="text-slate-500 font-medium">Suivi de vos activités et de vos points</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filtrer
          </Button>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {item.trend === 'up' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.type}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-slate-900'}`}>{item.amount}</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
