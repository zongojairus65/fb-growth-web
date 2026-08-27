export default function OptionCard({ icon, label, selected, onClick }) {
  if (selected) {
    return (
      <button onClick={onClick} className="gradient-border w-full text-left block" type="button">
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="text-lg">{icon}</span>
          <span className="text-white font-medium">{label}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-left rounded-full border border-white/10 bg-card hover:border-white/25 hover:bg-[#201d29] transition-colors px-5 py-4 flex items-center gap-3"
    >
      <span className="text-lg opacity-90">{icon}</span>
      <span className="text-white/90 font-medium">{label}</span>
    </button>
  );
}
