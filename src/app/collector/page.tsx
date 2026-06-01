import CollectorLayout from "@/components/collector/collector-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Navigation2,
  Package
} from "lucide-react";
import Link from "next/link";

export default function CollectorDashboard() {
  return (
    <CollectorLayout>
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
             <div>
               <h1 className="text-2xl font-bold text-slate-900">Ma Tournée</h1>
               <p className="text-slate-500 font-medium">Lundi 31 Mai 2026</p>
             </div>
             <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
               <Truck className="text-emerald-600" size={24} />
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">À collecter</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
             </div>
             <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs text-emerald-600 uppercase font-bold mb-1">Terminé</p>
                <p className="text-2xl font-bold text-emerald-700">3</p>
             </div>
          </div>
        </div>

        {/* Current Mission */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-2">
            <Navigation2 className="text-emerald-600 h-5 w-5" /> Mission Actuelle
          </h2>
          <Card className="border-none shadow-md overflow-hidden ring-2 ring-emerald-500">
            <CardContent className="p-0">
               <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <MapPin className="text-emerald-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Jean Dupont</p>
                      <p className="text-xs text-slate-500">Quartier Adidogomé, Rue 42</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-none">1.2 km</Badge>
               </div>
               <div className="p-5 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Package className="h-4 w-4" /> 2 sacs de Plastique (PET)
                  </div>
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                    <Link href="/collector/scan">Lancer la collecte</Link>
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-slate-800">Prochaines étapes</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Optimisé par IA</span>
          </div>

          <div className="space-y-3">
            <MissionItem 
              name="Marie Koume" 
              address="Avenue de la Paix, Immeuble B" 
              distance="3.5 km" 
              type="Papier & Carton" 
              status="PENDING"
            />
            <MissionItem 
              name="Pharmacie du Centre" 
              address="Boulevard circulaire, Place 2" 
              distance="4.8 km" 
              type="Verre" 
              status="PENDING"
            />
            <MissionItem 
              name="Resto Le Mono" 
              address="Rue des Cocotiers" 
              distance="5.2 km" 
              type="Organique" 
              status="PENDING"
            />
            <MissionItem 
              name="Koffi Mensah" 
              address="Quartier Agoè, Villa 88" 
              distance="8.1 km" 
              type="Plastique" 
              status="COMPLETED"
            />
          </div>
        </div>

        {/* Offline Mode Alert */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-blue-600 shrink-0 h-5 w-5" />
          <div>
            <p className="text-sm font-bold text-blue-900">Mode Hors Ligne Activé</p>
            <p className="text-xs text-blue-700">Vos données seront synchronisées dès que la connexion sera rétablie.</p>
          </div>
        </div>
      </div>
    </CollectorLayout>
  );
}

function MissionItem({ name, address, distance, type, status }: { name: string, address: string, distance: string, type: string, status: 'PENDING' | 'COMPLETED' }) {
  const isCompleted = status === 'COMPLETED';

  return (
    <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
      isCompleted ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-100 shadow-sm"
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isCompleted ? "bg-slate-200" : "bg-slate-50"
        }`}>
          {isCompleted ? <CheckCircle2 className="text-slate-500 h-5 w-5" /> : <Clock className="text-slate-400 h-5 w-5" />}
        </div>
        <div>
          <p className={`font-bold text-sm ${isCompleted ? "text-slate-500 line-through" : "text-slate-900"}`}>{name}</p>
          <p className="text-xs text-slate-500 truncate max-w-[150px]">{address}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-slate-900">{distance}</p>
        <p className="text-[10px] uppercase font-bold text-emerald-600">{type}</p>
      </div>
    </div>
  );
}
