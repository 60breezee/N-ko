"use client";

import CollectorLayout from "@/components/collector/collector-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Phone, Info } from "lucide-react";
import dynamic from "next/dynamic";

const MissionMap = dynamic(() => import("@/components/collector/mission-map"), { ssr: false });

const MOCK_MISSIONS = [
  { id: "1", name: "Ma Position", lat: 6.1323, lng: 1.2228, current: true },
  { id: "2", name: "Jean Dupont", lat: 6.1383, lng: 1.2288 },
  { id: "3", name: "Marie Koume", lat: 6.1453, lng: 1.2358 },
  { id: "4", name: "Centre de Tri A", lat: 6.1253, lng: 1.2158 },
];

export default function CollectorMapPage() {
  return (
    <CollectorLayout>
      <div className="space-y-4">
        {/* Floating Header */}
        <div className="flex items-center justify-between gap-4">
           <div>
             <h1 className="text-2xl font-bold">Itinéraire</h1>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">3 missions restantes</p>
           </div>
           <Badge className="bg-blue-100 text-blue-700 border-none px-4 py-2">
             Trafic Fluide
           </Badge>
        </div>

        {/* Map Container */}
        <div className="relative">
          <MissionMap missions={MOCK_MISSIONS} />
          
          {/* Bottom Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                      <Navigation size={24} />
                   </div>
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Prochain arrêt</p>
                      <p className="font-bold text-slate-900">Jean Dupont</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xl font-bold text-emerald-600">5 min</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">1.2 km</p>
                </div>
             </div>
             
             <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl">
                  Démarrer Navigation
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200">
                  <Phone className="h-5 w-5 text-slate-600" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200">
                  <Info className="h-5 w-5 text-slate-600" />
                </Button>
             </div>
          </div>
        </div>
      </div>
    </CollectorLayout>
  );
}
