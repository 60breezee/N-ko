import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function RequestsPage() {
  const requests = [
    { id: "REQ-8492", type: "Plastique (PET)", date: "31 Mai 2026", status: "PENDING", statusLabel: "En attente", color: "amber" },
    { id: "REQ-8431", type: "Papier & Carton", date: "28 Mai 2026", status: "COMPLETED", statusLabel: "Terminé", color: "emerald" },
    { id: "REQ-8399", type: "Verre", date: "21 Mai 2026", status: "COMPLETED", statusLabel: "Terminé", color: "emerald" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mes Collectes</h1>
          <p className="text-slate-500 font-medium">Historique et suivi de vos demandes de recyclage</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${req.color}-100 rounded-xl`}>
                      <Recycle className={`h-6 w-6 text-${req.color}-600`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-slate-400">{req.id}</span>
                        <Badge variant="secondary" className={`bg-${req.color}-50 text-${req.color}-700 border-${req.color}-100`}>
                          {req.statusLabel}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{req.type}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {req.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Abidjan, Cocody
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors hidden md:block" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
