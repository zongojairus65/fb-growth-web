import ScreenHeader from "../components/ScreenHeader.jsx";

const FORMAT_ICON = {
  "vidéo": "🎬",
  video: "🎬",
  image: "🖼️",
  texte: "📝",
  lien: "🔗",
};

export default function StrategyResultsScreen({ ideas, onBack, onSelectIdea }) {
  return (
    <div className="min-h-screen app-shell px-6 pb-8">
      <div className="max-w-md mx-auto">
        <ScreenHeader onBack={onBack} title="Tes 10 idées" />
        <p className="text-muted mb-6">Choisis-en une pour générer les hooks, les formats, et affiner le texte final.</p>

        <div className="space-y-3">
          {ideas.map((idea, i) => (
            <button
              key={i}
              onClick={() => onSelectIdea(idea)}
              type="button"
              className="w-full text-left rounded-2xl bg-card border border-white/10 hover:border-fuchsia-400/40 transition-colors p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{FORMAT_ICON[idea.format?.toLowerCase()] || "✨"}</span>
                <div>
                  <p className="font-semibold text-white/95 mb-1">{idea.concept}</p>
                  <p className="text-white/50 text-sm capitalize">{idea.format}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
