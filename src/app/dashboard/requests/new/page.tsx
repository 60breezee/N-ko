"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, MapPin, Recycle, Upload, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MapPicker = dynamic(() => import("@/components/dashboard/map-picker"), { ssr: false });

export default function NewRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState({ lat: 6.1323, lng: 1.2228 });
  const [wasteType, setWasteType] = useState("PLASTIC_PET");

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      toast.success("Demande de collecte envoyée !");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => step > 1 && step < 4 ? setStep(step - 1) : router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Demander une collecte</h1>
            <p className="text-slate-500">Suivez les étapes pour programmer votre ramassage</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
           <StepIndicator current={step} step={1} label="Type de déchets" />
           <div className="flex-1 h-px bg-slate-200 mx-4" />
           <StepIndicator current={step} step={2} label="Localisation" />
           <div className="flex-1 h-px bg-slate-200 mx-4" />
           <StepIndicator current={step} step={3} label="Planification" />
        </div>

        {/* Step 1: Waste Type */}
        {step === 1 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quel type de déchets souhaitez-vous recycler ?</CardTitle>
              <CardDescription>Sélectionnez la catégorie principale pour nous aider à trier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={wasteType} onValueChange={setWasteType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WasteOption 
                  value="PLASTIC_PET" 
                  title="Plastique (PET/HDPE)" 
                  description="Bouteilles, bidons, flacons..." 
                  icon={<Recycle className="h-6 w-6 text-blue-600" />}
                />
                <WasteOption 
                  value="CARDBOARD" 
                  title="Papier & Carton" 
                  description="Boîtes, journaux, emballages..." 
                  icon={<Recycle className="h-6 w-6 text-amber-600" />}
                />
                <WasteOption 
                  value="GLASS" 
                  title="Verre" 
                  description="Bouteilles, bocaux, flacons..." 
                  icon={<Recycle className="h-6 w-6 text-emerald-600" />}
                />
                <WasteOption 
                  value="ORGANIC" 
                  title="Organique (Compost)" 
                  description="Restes alimentaires, végétaux..." 
                  icon={<Recycle className="h-6 w-6 text-orange-600" />}
                />
              </RadioGroup>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8">
                  Continuer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Où doit s'effectuer la collecte ?</CardTitle>
              <CardDescription>Déplacez le marqueur sur la carte pour nous indiquer votre position exacte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MapPicker onLocationSelect={(lat, lng) => setLocation({ lat, lng })} />
              <div className="space-y-2">
                <Label htmlFor="address">Adresse ou point de repère</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="address" placeholder="Ex: Maison bleue à côté de l'école..." className="pl-10" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(3)} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8">
                  Continuer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Scheduling */}
        {step === 3 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quand préférez-vous le ramassage ?</CardTitle>
              <CardDescription>Choisissez une date et fournissez des détails supplémentaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label>Sélectionner une date</Label>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal h-11 ${!date && "text-muted-foreground"}`}
                        />
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume estimé</Label>
                    <RadioGroup defaultValue="small" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small">Petit (1-2 sacs)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large">Grand (+3 sacs)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Photo (Optionnel)</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-emerald-600" />
                    <p className="text-sm font-medium text-slate-600">Cliquez pour ajouter une photo</p>
                    <p className="text-xs text-slate-400">JPG, PNG jusqu'à 5 Mo</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !date} 
                  className="bg-emerald-600 hover:bg-emerald-700 h-11 px-12"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Confirmer la collecte"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <Card className="border-none shadow-sm text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Demande confirmée !</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Votre demande de collecte a été enregistrée avec succès. Un collecteur sera assigné à votre mission d'ici peu.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button onClick={() => router.push("/dashboard")} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8">
                  Retour au tableau de bord
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard/requests")} className="h-11 px-8 border-slate-200">
                  Voir mes collectes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function StepIndicator({ current, step, label }: { current: number; step: number; label: string }) {
  const active = current === step;
  const completed = current > step;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
        active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : 
        completed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
      }`}>
        {completed ? <CheckCircle2 className="h-5 w-5" /> : step}
      </div>
      <span className={`text-xs font-bold uppercase tracking-wider ${active ? "text-emerald-700" : "text-slate-400"}`}>
        {label}
      </span>
    </div>
  );
}

function WasteOption({ value, title, description, icon }: { value: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:bg-emerald-50 hover:bg-slate-50 cursor-pointer transition-all"
      >
        <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
        <div className="flex-1">
          <p className="font-bold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </Label>
    </div>
  );
}
