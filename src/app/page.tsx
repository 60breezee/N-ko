import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Recycle, Truck, BarChart3, ShieldCheck, ArrowRight, Leaf, Globe, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">NEKO</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="#features">
            Solutions
          </Link>
          <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="#impact">
            Impact
          </Link>
          <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/auth/signin">
            Connexion
          </Link>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/auth/signup">Démarrer</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-emerald-50/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4 animate-pulse">
                La révolution de l'économie circulaire en Afrique 🌍
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl text-slate-900">
                Gérez vos déchets, <span className="text-emerald-600">valorisez l'avenir</span>.
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl lg:text-lg xl:text-xl font-medium">
                NEKO connecte particuliers, entreprises et centres de recyclage pour une gestion intelligente, traçable et rémunératrice des matières premières.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] pt-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg h-12 px-8">
                  <Link href="/auth/signup">
                    Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12 px-8 border-slate-200">
                  Voir la démo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Une solution complète à 360°</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                De la collecte intelligente à la bourse des matières recyclées, NEKO digitalise toute la chaîne de valeur.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Truck className="h-8 w-8 text-emerald-600" />}
                title="Collecte Intelligente"
                description="Planification optimisée des tournées, géolocalisation en temps réel et scan QR pour une traçabilité totale."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-8 w-8 text-emerald-600" />}
                title="Analytique Avancée"
                description="Suivez votre impact environnemental, vos volumes recyclés et vos gains financiers en un clin d'œil."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-8 w-8 text-emerald-600" />}
                title="Écosystème Sécurisé"
                description="Rôles dédiés pour tous les acteurs : collecteurs, agents de tri, entreprises et municipalités."
              />
              <FeatureCard 
                icon={<Leaf className="h-8 w-8 text-emerald-600" />}
                title="Passeport Écologique"
                description="Valorisez vos actions avec un score environnemental et gagnez des points de fidélité réels."
              />
              <FeatureCard 
                icon={<Globe className="h-8 w-8 text-emerald-600" />}
                title="Bourse des Matières"
                description="Accédez aux prix du marché en temps réel pour le plastique, le cuivre, l'aluminium et le verre."
              />
              <FeatureCard 
                icon={<Zap className="h-8 w-8 text-emerald-600" />}
                title="IA & IoT Ready"
                description="Reconnaissance automatique des déchets par IA et poubelles connectées avec capteurs de remplissage."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem value="15k+" label="Collectes réalisées" />
              <StatItem value="450t" label="Déchets valorisés" />
              <StatItem value="98%" label="Taux de satisfaction" />
              <StatItem value="120" label="Centres partenaires" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">NEKO</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 NEKO SaaS. Tous droits réservés. Déployé avec ❤️ en Afrique.
            </p>
            <div className="flex gap-4">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Conditions
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300">
      <div className="mb-4 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-emerald-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-4xl md:text-5xl font-bold text-emerald-500">{value}</h4>
      <p className="text-slate-400 font-medium">{label}</p>
    </div>
  );
}
