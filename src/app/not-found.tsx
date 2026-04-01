import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-heading text-8xl font-bold text-ice-blue/20 mb-4">
          404
        </div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted text-sm mb-6">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ice-blue hover:bg-ice-blue-hover text-black px-6 py-3 font-label font-semibold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
