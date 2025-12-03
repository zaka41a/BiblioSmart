import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
    <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Page introuvable</h1>
    <p className="text-sm text-slate-600 dark:text-slate-300">
      La page demandée n’existe pas ou a été déplacée. Revenez à l’accueil pour poursuivre votre exploration de
      BiblioSmart.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-green"
    >
      Retour à l’accueil
    </Link>
  </div>
);

export default NotFound;
