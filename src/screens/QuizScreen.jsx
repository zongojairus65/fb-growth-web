import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar.jsx";
import ScreenHeader from "../components/ScreenHeader.jsx";
import OptionCard from "../components/OptionCard.jsx";
import FeedbackCallout from "../components/FeedbackCallout.jsx";
import ContinueButton from "../components/ContinueButton.jsx";
import { api } from "../lib/api.js";

const FEEDBACK = {
  frein_principal: {
    "Je poste, mais personne ne réagit à mes posts": "C'est le blocage le plus commun. On va corriger ça avec des hooks qui arrêtent vraiment le scroll.",
    "Je manque d'idées de contenu": "Ça se travaille. On va te donner un stock d'idées prêtes à décliner.",
    "J'ai du mal à poster régulièrement": "La régularité, c'est 80% du jeu. On va te simplifier la génération pour que ce soit rapide.",
    "Je galère à convertir mon audience": "On va muscler tes appels à l'action pour transformer l'attention en vraie interaction.",
  },
  rapport_echec: {
    "Pas du tout": "Solide état d'esprit — c'est ce qui permet de tester sans se décourager.",
    "Un peu": "Normal, tout le monde ressent ça un minimum. On avance quand même.",
    "Neutre": "Ok, on garde ça en tête pour calibrer le ton de tes contenus.",
    "Plutôt oui": "On va justement éviter les messages qui jugent — place à l'expérimentation sans pression.",
    "Totalement": "Personne ne perce du jour au lendemain. On construit un plan qui retire la pression de la perfection.",
  },
};

export default function QuizScreen({ profileId, onDone }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getQuiz().then((data) => {
      setQuestions(data?.questions || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!questions.length) {
    onDone();
    return null;
  }

  const question = questions[index];
  const feedback = selected ? FEEDBACK[question.id]?.[selected] : null;

  const handleSelect = async (option) => {
    setSelected(option);
    try {
      await api.submitQuizAnswer({ profile_id: profileId, question_id: question.id, answer: option });
    } catch {
      // Sauvegarde best-effort
    }
  };

  const handleContinue = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      onDone();
    }
  };

  return (
    <div className="min-h-screen app-shell px-6 pb-8">
      <div className="max-w-md mx-auto">
        <ScreenHeader onBack={() => index > 0 && setIndex(index - 1)} showBack={index > 0} />
        <div className="mb-8">
          <ProgressBar step={index + 1} totalSteps={questions.length} />
        </div>

        <h2 className="text-2xl font-bold mb-8 leading-snug">{question.question}</h2>

        <div className="space-y-3 mb-6">
          {question.options.map((opt) => (
            <OptionCard
              key={opt}
              label={opt}
              icon="●"
              selected={selected === opt}
              onClick={() => handleSelect(opt)}
            />
          ))}
        </div>

        {feedback && (
          <div className="mb-6">
            <FeedbackCallout>{feedback}</FeedbackCallout>
          </div>
        )}

        <ContinueButton disabled={!selected} onClick={handleContinue}>
          Continuer
        </ContinueButton>
      </div>
    </div>
  );
}
