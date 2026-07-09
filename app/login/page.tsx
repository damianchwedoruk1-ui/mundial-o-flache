"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Wpisz e-mail i hasło.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage("Nie udało się zalogować. Sprawdź e-mail i hasło.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="page" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <section
        className="panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "28px",
          borderRadius: "26px",
        }}
      >
        <p className="eyebrow">Prywatna liga typowania</p>
        <h1 style={{ marginBottom: "8px" }}>🏆 Mundial o Flachę</h1>
        <p className="muted" style={{ marginBottom: "24px" }}>
          Zaloguj się na swoje konto, żeby obstawiać mecze i używać mocy.
        </p>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "14px" }}>
          <label style={{ display: "grid", gap: "7px" }}>
            <span className="muted" style={{ fontSize: "13px", fontWeight: 700 }}>
              E-mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="np. damian@test.pl"
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,.12)",
                background: "#0d142b",
                color: "white",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "7px" }}>
            <span className="muted" style={{ fontSize: "13px", fontWeight: 700 }}>
              Hasło
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Hasło"
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,.12)",
                background: "#0d142b",
                color: "white",
                outline: "none",
              }}
            />
          </label>

          {errorMessage && (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "14px",
                border: "1px solid rgba(255, 85, 112, .35)",
                background: "rgba(255, 85, 112, .12)",
                color: "#fecdd3",
                fontWeight: 700,
              }}
            >
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn" disabled={isLoading} style={{ marginTop: "4px" }}>
            {isLoading ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>
      </section>
    </main>
  );
}
