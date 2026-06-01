"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Bell, Shield, Smartphone, Globe, Loader2, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Paramètres mis à jour avec succès", {
        icon: <Check className="h-4 w-4 text-emerald-500" />
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
          <p className="text-slate-500 font-medium">Gérez votre compte et vos préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} className="text-emerald-600" /> Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Dupont" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                </div>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} className="text-emerald-600" /> Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes de collecte</Label>
                    <p className="text-sm text-slate-500">Recevoir une notification quand le collecteur est proche</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="space-y-0.5">
                    <Label>Rapports mensuels</Label>
                    <p className="text-sm text-slate-500">Recevoir un résumé de votre impact écologique par email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield size={20} /> Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent border-white/20 hover:bg-white/10 text-white">
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-white/20 hover:bg-white/10 text-white">
                  Double authentification
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone size={20} className="text-emerald-600" /> Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Version</span>
                  <span className="font-medium">1.2.0 (Build 44)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Langue</span>
                  <span className="font-medium flex items-center gap-1">
                    <Globe size={14} /> Français
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
