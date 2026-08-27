import ContinueButton from "../components/ContinueButton.jsx";
import ScreenHeader from "../components/ScreenHeader.jsx";

export default function DiagnosticScreen({ diagnostic, username, onContinue, onBack }) {
  const { niche_detectee, resume, hashtags = [], points_forts = [], points_faibles = [] } = diagnostic;

  return (
    <div className="min-h-screen app-shell px-6 pb-8">
      <div className="max-w-md mx-auto">
        <ScreenHeader onBack={onBack} />

        <div className="text-center mb-6">
          <p className="font-bold text-lg">@{username}</p>
        </div>

        <p className="text-white/50 text-sm font-semibold mb-3">Analyse IA</p>

        <div className="rounded-2xl bg-card border border-white/10 p-5 mb-4">
          <p className="text-white/50 text-sm font-semibold mb-1">Niche</p>
          <p className="text-fuchsia-300 font-medium">{niche_detectee}</p>
        </div>

        <div className="rounded-2xl bg-card border border-white/10 p-5 mb-4">
          <p className="text-white/50 text-sm font-semibold mb-2">Résumé</p>
          <p className="text-white/90 leading-relaxed">{resume}</p>
        </div>

        {hashtags.length > 0 && (
          <div className="rounded-2xl bg-card border border-white/10 p-5 mb-4">
            <p className="text-white/50 text-sm font-semibold mb-3">Hashtags</p>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <span key={tag} className="rounded-full bg-fuchsia-500/15 text-fuchsia-300 text-sm px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {points_forts.length > 0 && (
          <div className="rounded-2xl bg-card border border-white/10 p-5 mb-4">
            <p className="font-bold mb-3">Points forts</p>
            <ul className="space-y-3">
              {points_forts.map((p, i) => (
                <li key={i} className="flex gap-3 text-white/90 text-[15px]">
                  <span className="text-green-400 shrink-0">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {points_faibles.length > 0 && (
          <div className="rounded-2xl bg-card border border-white/10 p-5 mb-6">
            <p className="font-bold mb-3">Points faibles</p>
            <ul className="space-y-3">
              {points_faibles.map((p, i) => (
                <li key={i} className="flex gap-3 text-white/90 text-[15px]">
                  <span className="text-amber-400 shrink-0">!</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ContinueButton filled onClick={onContinue}>
          Continuer
        </ContinueButton>
      </div>
    </div>
  );
}
