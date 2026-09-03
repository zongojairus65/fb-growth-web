import { useState } from "react";
import ContinueButton from "../components/ContinueButton.jsx";

export default function UsernameScreen({ onSubmit, error }) {
  const [mode, setMode] = useState("username"); // "username" | "page"
  const [username, setUsername] = useState("");
  const [pageId, setPageId] = useState("");
  const [pageToken, setPageToken] = useState("");

  const canSubmit = mode === "username" ? username.trim() : pageId.trim() && pageToken.trim();

  const handleSubmit = () => {
    if (mode === "username") {
      onSubmit({ mode, fb_username: username.trim() });
    } else {
      onSubmit({ mode, fb_page_id: pageId.trim(), fb_page_token: pageToken.trim() });
    }
  };

  return (
    <div className="min-h-screen app-shell flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-center mb-4">Blow Up</h1>
        <h2 className="text-2xl font-bold text-center mb-3">Prêt pour ton diagnostic Facebook&nbsp;?</h2>
        <p className="text-muted text-center text-[15px] mb-8 px-2">
          Scanne un profil public en un clic, ou connecte ta Page pour un diagnostic plus riche (avec les vraies statistiques d'impressions).
        </p>

        <div className="flex gap-2 mb-6">
          <ModeTab active={mode === "username"} onClick={() => setMode("username")}>
            Scan rapide
          </ModeTab>
          <ModeTab active={mode === "page"} onClick={() => setMode("page")}>
            Ma Page connectée
          </ModeTab>
        </div>

        {mode === "username" ? (
          <div className="rounded-full bg-card border border-white/10 px-5 py-4 flex items-center gap-2 mb-4">
            <span className="text-white/50">@</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
              placeholder="jean.createur"
              className="bg-transparent outline-none text-white placeholder-white/40 flex-1"
              aria-label="Nom d'utilisateur Facebook"
            />
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            <div className="rounded-full bg-card border border-white/10 px-5 py-4">
              <input
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                placeholder="ID de ta Page Facebook"
                className="bg-transparent outline-none text-white placeholder-white/40 w-full"
                aria-label="ID de Page Facebook"
              />
            </div>
            <div className="rounded-full bg-card border border-white/10 px-5 py-4">
              <input
                value={pageToken}
                onChange={(e) => setPageToken(e.target.value)}
                type="password"
                placeholder="Token d'accès de la Page"
                className="bg-transparent outline-none text-white placeholder-white/40 w-full"
                aria-label="Token d'accès de Page Facebook"
              />
            </div>
            <p className="text-white/40 text-xs px-2">
              Ton token n'est jamais stocké côté client — il est envoyé une seule fois pour ce diagnostic.
            </p>
          </div>
        )}

        {error && <p className="text-rose-400 text-sm mb-4 text-center">{error}</p>}

        <ContinueButton filled disabled={!canSubmit} onClick={handleSubmit}>
          Analyser mon compte maintenant
        </ContinueButton>
      </div>
    </div>
  );
}

function ModeTab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
        active ? "text-white" : "text-white/50 bg-card"
      }`}
      style={active ? { background: "linear-gradient(135deg, #c084fc, #f472b6)" } : {}}
    >
      {children}
    </button>
  );
}
