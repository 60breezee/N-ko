"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Mail, Lock, User, Loader2, ArrowRight, Building2, Truck, Warehouse, Tractor, ShoppingCart, Landmark } from "lucide-react";
import Link from "next/link";

const ROLES = [
  { value: "CLIENT_INDIVIDUAL", label: "Particulier", icon: User, desc: "Dépôt et suivi de mes déchets" },
  { value: "CLIENT_COMPANY", label: "Entreprise", icon: Building2, desc: "Gestion des déchets professionnels" },
  { value: "COLLECTOR", label: "Collecteur", icon: Truck, desc: "Tournées et missions de collecte" },
  { value: "SORTING_AGENT", label: "Agent de tri", icon: Warehouse, desc: "Centre de tri et valorisation" },
  { value: "FARMER", label: "Agriculteur", icon: Tractor, desc: "Valorisation des déchets organiques" },
  { value: "BUYER", label: "Acheteur", icon: ShoppingCart, desc: "Achat de matériaux recyclés" },
  { value: "MUNICIPALITY", label: "Municipalité", icon: Landmark, desc: "Gestion des déchets municipaux" },
] as const;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT_INDIVIDUAL");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }
      
      router.push("/auth/signin?registered=true");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
              <Recycle className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">NEKO</h1>
            <p className="text-slate-500 font-medium">Rejoignez la révolution verte</p>
          </Link>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Créer un compte</CardTitle>
            <CardDescription>
              Choisissez votre profil et inscrivez-vous
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label>Type de compte</Label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                          role === r.value
                            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${role === r.value ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900">{r.label}</div>
                          <div className="text-xs text-slate-500 truncate">{r.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="text-xs text-slate-500 pt-2">
                En s'inscrivant, vous acceptez nos{" "}
                <a href="#" className="text-emerald-600 hover:underline">Conditions d'utilisation</a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    S'inscrire <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <div className="text-center text-sm text-slate-500">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/signin" className="text-emerald-600 font-semibold hover:underline">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
