export default function ProgressBar({ step, totalSteps }) {
  const pct = Math.max(6, Math.round((step / totalSteps) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-white/15 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full bg-white transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
