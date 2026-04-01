"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Email atau password salah");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-ice-blue clip-corner-md flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-heading font-bold text-xl">M</span>
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
            MMJ Athletics
          </h1>
          <p className="text-muted text-sm mt-1">Admin Panel Login</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="bg-admin-surface border border-border rounded-sm p-6 space-y-4">
          {error && (
            <div className="bg-mmj-red/10 border border-mmj-red/20 rounded-sm px-4 py-2.5 text-sm text-mmj-red">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                id="email"
                type="email"
                placeholder="admin@mmjathletics.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface border border-border rounded-sm pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface border border-border rounded-sm pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Masuk...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted mt-4">
          © {new Date().getFullYear()} MMJ Athletics Admin
        </p>
      </div>
    </div>
  );
}
