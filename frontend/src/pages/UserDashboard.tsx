import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const mockLoans = Array.from({ length: 3 }).map((_, index) => ({
  id: `loan-${index}`,
  title: `Livre en cours #${index + 1}`,
  dueDate: "15/12/2025",
  status: index === 0 ? "En retard" : "En cours"
}));

export const UserDashboard = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Bonjour, Léa</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Retrouvez vos emprunts en cours, vos listes et les recommandations générées par l’algorithme BiblioSmart.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-elevated dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Emprunts</h2>
            <Link to="/catalogue" className="text-sm text-brand-blue hover:text-brand-green">
              Explorer le catalogue
            </Link>
          </div>
          <ul className="mt-4 space-y-4">
            {mockLoans.map((loan) => (
              <li key={loan.id} className="rounded-2xl border border-slate-200/60 p-4 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{loan.title}</p>
                    <p className="text-xs text-slate-500">Retour prévu le {loan.dueDate}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      loan.status === "En retard"
                        ? "bg-red-100 text-red-600"
                        : "bg-brand-green/10 text-brand-green"
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-elevated dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Suggestions personnalisées</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Intégrez l’API `/users/:id/recommendations` pour afficher des titres similaires en fonction de l’historique
            des emprunts ou des listes.
          </p>
          <Button variant="outline" className="mt-4">
            Voir toutes les recommandations
          </Button>
        </article>
      </section>
    </div>
  );
};

export default UserDashboard;
