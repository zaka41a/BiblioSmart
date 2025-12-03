import { Button } from "../components/ui/Button";

const cards = [
  {
    title: "Livres",
    value: "12 500",
    description: "Gestion du catalogue, import CSV, métadonnées enrichies.",
    actionLabel: "Gérer les livres"
  },
  {
    title: "Utilisateurs",
    value: "5 680",
    description: "Profils, droits, invitations et statistiques d’engagement.",
    actionLabel: "Gestion des profils"
  },
  {
    title: "Emprunts",
    value: "1 240",
    description: "Suivi des retours, relances automatiques, pénalités.",
    actionLabel: "Piloter les emprunts"
  }
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Tableau de bord admin</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Visualisez en un coup d’œil la santé de votre bibliothèque et orchestrez vos opérations.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-elevated dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-blue">{card.title}</p>
            <p className="text-3xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            <Button variant="outline" className="w-full">
              {card.actionLabel}
            </Button>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-elevated dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Activité récente</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Connectez l’endpoint `/admin/logs` pour afficher les derniers emprunts validés, les retours en retard et les
          nouveaux comptes créés.
        </p>
        <div className="mt-4 grid gap-3 text-sm">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-slate-100/60 px-4 py-3 dark:bg-slate-800/80">
              <p className="font-medium text-slate-800 dark:text-slate-200">Action #{index + 1}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Détails à alimenter depuis l’API.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
