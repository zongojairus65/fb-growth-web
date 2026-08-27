import { useEffect, useState } from "react";
import ContinueButton from "../components/ContinueButton.jsx";
import ScreenHeader from "../components/ScreenHeader.jsx";
import { api } from "../lib/api.js";

export default function ProjectionScreen({ profileId, avgReach, onContinue }) {
  const [projection, setProjection] = useState(null);

  useEffect(() => {
    api.getProjection(profileId, avgReach).then(setProjection).catch(() => {});
  }, [profileId, avgReach]);

  if (!projection) return null;

  const { paliers, message_motivation } = projection;
  const max = Math.max(...paliers.map((p) => p.valeur));

  return (
    <div className="min-h-screen app-shell px-6 pb-8 flex flex-col">
      <ScreenHeader showBack={false} />

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="relative h-56 mb-10">
          <svg viewBox="0 0 300 180" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            <polyline
              points={paliers
                .map((p, i) => {
                  const x = (i / (paliers.length - 1)) * 280 + 10;
                  const y = 160 - (p.valeur / max) * 140;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {paliers.map((p, i) => {
              const x = (i / (paliers.length - 1)) * 280 + 10;
              const y = 160 - (p.valeur / max) * 140;
              return <circle key={p.label} cx={x} cy={y} r={i === 0 ? 7 : 5} fill={i === 0 ? "#fff" : "#f472b6"} />;
            })}
          </svg>
          <div className="absolute inset-x-0 -bottom-2 flex justify-between text-xs text-white/60 px-2">
            {paliers.map((p) => (
              <span key={p.label}>{p.label}</span>
            ))}
          </div>
        </div>

        <p className="text-white/85 text-center leading-relaxed mb-10 px-2">{message_motivation}</p>

        <ContinueButton filled onClick={onContinue}>
          Continuer
        </ContinueButton>
      </div>
    </div>
  );
}
