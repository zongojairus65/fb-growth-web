export default function ScreenHeader({ onBack, title, showBack = true }) {
  return (
    <div className="flex items-center gap-4 pt-6 pb-2">
      {showBack ? (
        <button onClick={onBack} aria-label="Retour" type="button" className="text-white/90 text-2xl leading-none px-1">
          &#8249;
        </button>
      ) : (
        <span className="w-6" />
      )}
      {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
    </div>
  );
}
