export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-ice-blue/10 clip-corner-sm flex items-center justify-center animate-pulse">
            <span className="text-ice-blue font-heading font-bold text-lg">M</span>
          </div>
          <div className="absolute inset-0 w-12 h-12">
            <svg className="animate-spin" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#4fc3f7"
                strokeWidth="2"
                strokeDasharray="60 80"
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
