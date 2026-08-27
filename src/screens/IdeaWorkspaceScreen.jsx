import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader.jsx";
import ContinueButton from "../components/ContinueButton.jsx";
import RichText from "../components/RichText.jsx";
import { api } from "../lib/api.js";

const TABS = [
  { id: "hooks", label: "Hooks" },
  { id: "formats", label: "Formats" },
  { id: "refine", label: "Peaufiner" },
];

export default function IdeaWorkspaceScreen({ idea, profileId, audience, onBack }) {
  const [tab, setTab] = useState("hooks");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async (tabId) => {
    setLoading(true);
    setError("");
    try {
      if (tabId === "hooks") {
        const res = await api.generateHooks({ profile_id: profileId, idee: idea.concept, audience, ton: "decontracte" });
        setResults((r) => ({ ...r, hooks: res.hooks }));
      } else if (tabId === "formats") {
        const res = await api.adaptFormats({ profile_id: profileId, idee: idea.concept, audience, objectif: idea.angle_psychologique || "" });
        setResults((r) => ({ ...r, formats: res.formats }));
      } else if (tabId === "refine") {
        const base = results.formats || results.hooks || idea.hook;
        const res = await api.refineContent({
          profile_id: profileId,
          contenu: base,
          voix: "decontractee",
          audience,
          objectif: "engagement",
        });
        setResults((r) => ({ ...r, refine: res.final }));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const content = results[tab];

  return (
    <div className="min-h-screen app-shell px-6 pb-8">
      <div className="max-w-md mx-auto">
        <ScreenHeader onBack={onBack} />
        <p className="text-white/50 text-sm font-semibold mb-1">Idée sélectionnée</p>
        <h2 className="text-xl font-bold mb-6 leading-snug">{idea.concept}</h2>

        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              type="button"
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? "text-white" : "text-white/50 bg-card"
              }`}
              style={tab === t.id ? { background: "linear-gradient(135deg, #c084fc, #f472b6)" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

        {content ? (
          <div className="rounded-2xl bg-card border border-white/10 p-5 mb-6">
            <RichText text={content} />
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-white/10 p-8 mb-6 text-center">
            <p className="text-white/50 text-sm">
              {tab === "refine"
                ? "Génère d'abord les formats ou les hooks, puis peaufine le résultat."
                : `Génère les ${TABS.find((t) => t.id === tab).label.toLowerCase()} pour cette idée.`}
            </p>
          </div>
        )}

        <ContinueButton filled loading={loading} onClick={() => generate(tab)}>
          {content ? "Régénérer" : "Générer"}
        </ContinueButton>
      </div>
    </div>
  );
}
