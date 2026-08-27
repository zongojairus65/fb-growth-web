export default function FeedbackCallout({ children }) {
  return (
    <div className="relative rounded-2xl bg-white/5 pl-5 pr-4 py-4 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ background: "linear-gradient(180deg, #c084fc, #f472b6)" }}
      />
      <p className="text-white/90 text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}
