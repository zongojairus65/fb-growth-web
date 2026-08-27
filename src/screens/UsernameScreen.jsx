import { useState } from "react";
import ContinueButton from "../components/ContinueButton.jsx";

export default function UsernameScreen({ onSubmit }) {
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen app-shell flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-center mb-4">Blow Up</h1>
        <h2 className="text-2xl font-bold text-center mb-3">Prêt pour ton diagnostic Facebook&nbsp;?</h2>
        <p className="text-muted text-center text-[15px] mb-10 px-2">
          Notre IA scanne ton profil public en profondeur pour identifier tes forces, tes points faibles, et ta prochaine stratégie de contenu.
        </p>

        <div className="rounded-full bg-card border border-white/10 px-5 py-4 flex items-center gap-2 mb-8">
          <span className="text-white/50">@</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
            placeholder="jean.createur"
            className="bg-transparent outline-none text-white placeholder-white/40 flex-1"
            aria-label="Nom d'utilisateur Facebook"
          />
        </div>

        <ContinueButton
          filled
          disabled={!username.trim()}
          onClick={() => onSubmit(username.trim())}
        >
          Analyser mon compte maintenant
        </ContinueButton>
      </div>
    </div>
  );
}
