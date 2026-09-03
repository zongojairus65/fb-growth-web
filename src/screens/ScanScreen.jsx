import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api.js";

const FALLBACK_STEPS = [
  { pct: 15, label: "Récupération du profil" },
  { pct: 35, label: "Lecture des statistiques" },
  { pct: 60, label: "Analyse des posts récents" },
  { pct: 85, label: "Analyse IA en cours" },
  { pct: 100, label: "Diagnostic prêt" },
];

export default function ScanScreen({ username, profileId, diagnosticInput, onDone, onError }) {
  const [steps, setSteps] = useState(FALLBACK_STEPS);
  const [current, setCurrent] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    api.getScanSteps().then((data) => {
      if (data?.steps?.length) setSteps(data.steps);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c < steps.length - 1 ? c + 1 : c));
    }, 900);

    if (!hasFetched.current) {
      hasFetched.current = true;
      api
        .runDiagnostic({ profile_id: profileId, niche_hint: "", ...diagnosticInput })
        .then((result) => {
          clearInterval(interval);
          setCurrent(steps.length - 1);
          setTimeout(() => onDone(result), 500);
        })
        .catch((err) => {
          clearInterval(interval);
          onError(err.message);
        });
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  const step = steps[current] || steps[0];

  return (
    <div className="min-h-screen app-shell flex flex-col px-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Analyse de ton compte</h1>
        <p className="text-muted mb-16">Patiente quelques secondes : on analyse {username}...</p>

        <div className="relative w-40 h-40 mb-10">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - step.pct / 100)}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold">
            {step.pct}%
          </div>
        </div>

        <p className="text-white/70">{step.label}</p>
      </div>
    </div>
  );
}
