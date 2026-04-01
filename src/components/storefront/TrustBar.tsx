import { ShieldCheck, Zap, Paintbrush, Trophy } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Dealer Resmi", desc: "Bauer & CCM" },
  { icon: Zap, label: "Respons Cepat", desc: "Via WhatsApp" },
  { icon: Paintbrush, label: "Desain Kustom", desc: "Jersey Tim" },
  { icon: Trophy, label: "Ahli Hoki", desc: "Sejak 2020" },
];

export function TrustBar() {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 bg-ice-blue/10 border border-ice-blue/20 flex items-center justify-center clip-corner-sm mx-auto mb-3">
                <Icon className="w-6 h-6 text-ice-blue" />
              </div>
              <h3 className="font-label font-semibold text-sm uppercase tracking-wider mb-0.5">
                {label}
              </h3>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
