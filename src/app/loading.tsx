export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-16 h-16 bg-ice-blue/10 clip-corner-md flex items-center justify-center animate-pulse">
            <span className="text-ice-blue font-heading font-bold text-2xl">M</span>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 w-16 h-16">
            <svg className="animate-spin" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#4fc3f7"
                strokeWidth="2"
                strokeDasharray="80 100"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
        <p className="text-muted text-xs font-label font-semibold uppercase tracking-widest">
          Memuat...
        </p>
      </div>
    </div>
  );
}
