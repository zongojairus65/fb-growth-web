import { useState } from "react";
import UsernameScreen from "./screens/UsernameScreen.jsx";
import ScanScreen from "./screens/ScanScreen.jsx";
import DiagnosticScreen from "./screens/DiagnosticScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import ProjectionScreen from "./screens/ProjectionScreen.jsx";
import StrategyFormScreen from "./screens/StrategyFormScreen.jsx";
import StrategyResultsScreen from "./screens/StrategyResultsScreen.jsx";
import IdeaWorkspaceScreen from "./screens/IdeaWorkspaceScreen.jsx";
import { api } from "./lib/api.js";

const STEPS = {
  USERNAME: "username",
  SCAN: "scan",
  DIAGNOSTIC: "diagnostic",
  QUIZ: "quiz",
  PROJECTION: "projection",
  STRATEGY_FORM: "strategy_form",
  STRATEGY_RESULTS: "strategy_results",
  IDEA_WORKSPACE: "idea_workspace",
};

export default function App() {
  const [step, setStep] = useState(STEPS.USERNAME);
  const [username, setUsername] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [diagnostic, setDiagnostic] = useState(null);
  const [strategyAudience, setStrategyAudience] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [error, setError] = useState("");
  const [strategyLoading, setStrategyLoading] = useState(false);

  const handleUsernameSubmit = async (name) => {
    setUsername(name);
    setError("");
    try {
      const { profile_id } = await api.createProfile({ fb_username: name });
      setProfileId(profile_id);
      setStep(STEPS.SCAN);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleStrategySubmit = async ({ niche, audience, objectif }) => {
    setStrategyAudience(audience);
    setStrategyLoading(true);
    setError("");
    try {
      const { ideas } = await api.generateStrategy({ profile_id: profileId, niche, audience, objectif });
      setIdeas(ideas);
      setStep(STEPS.STRATEGY_RESULTS);
    } catch (e) {
      setError(e.message);
    } finally {
      setStrategyLoading(false);
    }
  };

  // L'écran d'erreur plein écran ne s'affiche que pour les étapes SANS
  // écran dédié pour montrer l'erreur inline (USERNAME et SCAN l'affichent
  // eux-mêmes désormais, pour ne jamais échouer silencieusement).
  if (error && step !== STEPS.USERNAME && step !== STEPS.SCAN) {
    return (
      <div className="min-h-screen app-shell flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-rose-400 font-semibold mb-3">Une erreur est survenue</p>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={() => {
              setError("");
              setStep(STEPS.USERNAME);
            }}
            className="text-fuchsia-300 underline"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  switch (step) {
    case STEPS.USERNAME:
      return <UsernameScreen onSubmit={handleUsernameSubmit} error={error} />;

    case STEPS.SCAN:
      return (
        <ScanScreen
          username={username}
          profileId={profileId}
          onDone={(result) => {
            setDiagnostic(result);
            setStep(STEPS.DIAGNOSTIC);
          }}
          onError={(msg) => {
            setError(msg);
            setStep(STEPS.USERNAME);
          }}
        />
      );

    case STEPS.DIAGNOSTIC:
      return (
        <DiagnosticScreen
          diagnostic={diagnostic}
          username={username}
          onBack={() => setStep(STEPS.USERNAME)}
          onContinue={() => setStep(STEPS.QUIZ)}
        />
      );

    case STEPS.QUIZ:
      return <QuizScreen profileId={profileId} onDone={() => setStep(STEPS.PROJECTION)} />;

    case STEPS.PROJECTION:
      return (
        <ProjectionScreen
          profileId={profileId}
          avgReach={diagnostic?.raw_stats?.moyenne_likes || 0}
          onContinue={() => setStep(STEPS.STRATEGY_FORM)}
        />
      );

    case STEPS.STRATEGY_FORM:
      return (
        <StrategyFormScreen
          onBack={() => setStep(STEPS.PROJECTION)}
          onSubmit={handleStrategySubmit}
          loading={strategyLoading}
        />
      );

    case STEPS.STRATEGY_RESULTS:
      return (
        <StrategyResultsScreen
          ideas={ideas}
          onBack={() => setStep(STEPS.STRATEGY_FORM)}
          onSelectIdea={(idea) => {
            setSelectedIdea(idea);
            setStep(STEPS.IDEA_WORKSPACE);
          }}
        />
      );

    case STEPS.IDEA_WORKSPACE:
      return (
        <IdeaWorkspaceScreen
          idea={selectedIdea}
          profileId={profileId}
          audience={strategyAudience}
          onBack={() => setStep(STEPS.STRATEGY_RESULTS)}
        />
      );

    default:
      return null;
  }
}
