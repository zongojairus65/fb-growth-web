export default function ContinueButton({ children = "Continuer", onClick, disabled, filled = false, loading = false }) {
  if (filled) {
    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        type="button"
        className="w-full rounded-full py-4 font-bold text-white disabled:opacity-40 transition-opacity"
        style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)" }}
      >
        {loading ? "Chargement..." : children}
      </button>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled || loading} type="button" className="gradient-border w-full disabled:opacity-40 block">
      <div className="py-4 text-center font-bold text-white">{loading ? "Chargement..." : children}</div>
    </button>
  );
}
