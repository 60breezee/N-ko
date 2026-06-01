"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import CollectorLayout from "@/components/collector/collector-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ScanLine, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Camera,
  Weight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ScanPage() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [step, setStep] = useState<'SCANNING' | 'DETAILS' | 'SUCCESS'>('SCANNING');
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 'SCANNING') {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setStep('DETAILS');
          scanner.clear();
          toast.success("QR Code scanné avec succès !");
        },
        (error) => {
          // console.warn(error);
        }
      );

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }
  }, [step]);

  const handleFinalize = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('SUCCESS');
    }, 1500);
  };

  return (
    <CollectorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => step === 'DETAILS' ? setStep('SCANNING') : router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Validation Collecte</h1>
        </div>

        {step === 'SCANNING' && (
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle>Scanner le QR Code</CardTitle>
              <CardDescription>Scannez le code sur la poubelle ou le badge du client</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div id="qr-reader" className="w-full"></div>
               <div className="p-6 bg-slate-50 text-center">
                  <p className="text-sm text-slate-500 italic">Positionnez le QR Code dans le carré</p>
               </div>
            </CardContent>
          </Card>
        )}

        {step === 'DETAILS' && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-600 h-6 w-6" />
                 </div>
                 <div>
                    <CardTitle>Client : Jean Dupont</CardTitle>
                    <CardDescription>ID Scanné: {scanResult}</CardDescription>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2">
                    <Weight className="h-4 w-4" /> Poids collecté (kg)
                  </Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="Ex: 5.5" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="h-12 text-lg font-bold"
                  />
               </div>

               <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" /> Photo de preuve
                  </Label>
                  <div className="h-40 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-slate-200 transition-colors cursor-pointer">
                     <Camera className="h-8 w-8 text-slate-400" />
                     <p className="text-xs font-bold text-slate-500 uppercase">Prendre une photo</p>
                  </div>
               </div>

               <Button 
                onClick={handleFinalize} 
                disabled={loading || !weight}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-bold rounded-2xl shadow-lg shadow-emerald-100"
               >
                 {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Terminer la collecte"}
               </Button>
            </CardContent>
          </Card>
        )}

        {step === 'SUCCESS' && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="text-emerald-600 h-12 w-12" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Bravo !</h2>
              <p className="text-slate-500">Collecte validée et points client mis à jour.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl w-full max-w-xs">
               <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Impact généré</p>
               <p className="text-lg font-bold text-emerald-800">+ 50 Points Fidélité</p>
               <p className="text-lg font-bold text-emerald-800">+ 0.5kg CO2 évité</p>
            </div>
            <Button onClick={() => router.push('/collector')} className="bg-slate-900 hover:bg-slate-800 h-12 px-8 rounded-xl w-full max-w-xs">
              Mission suivante
            </Button>
          </div>
        )}
      </div>
    </CollectorLayout>
  );
}
