import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader.jsx";
import ContinueButton from "../components/ContinueButton.jsx";

export default function StrategyFormScreen({ onBack, onSubmit, loading }) {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [objectif, setObjectif] = useState("");

  const canSubmit = niche.trim() && audience.trim() && objectif.trim();

  return (
    <div className="min-h-screen app-shell px-6 pb-8">
      <div className="max-w-md mx-auto">
        <ScreenHeader onBack={onBack} />
        <h2 className="text-2xl font-bold mb-2">Ta prochaine stratégie</h2>
        <p className="text-muted mb-8">Trois infos et l'IA génère 10 idées de posts qui cassent les tendances saturées.</p>

        <div className="space-y-4 mb-8">
          <Field label="Ta niche" value={niche} onChange={setNiche} placeholder="Ex: cuisine africaine" />
          <Field label="Ton audience" value={audience} onChange={setAudience} placeholder="Ex: jeunes pros francophones" />
          <Field label="Ton objectif" value={objectif} onChange={setObjectif} placeholder="Ex: croissance de la communauté" />
        </div>

        <ContinueButton filled disabled={!canSubmit} loading={loading} onClick={() => onSubmit({ niche, audience, objectif })}>
          Générer mes 10 idées
        </ContinueButton>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-white/50 text-sm font-semibold mb-2 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-card border border-white/10 px-5 py-4 outline-none text-white placeholder-white/30 focus:border-fuchsia-400/50"
      />
    </div>
  );
}
