import Link from 'next/link';

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Prywatna liga typowania</p>
          <h1>🏆 Liga Mundialowa</h1>
          <p className="muted">Wersja online z logowaniem i bazą danych.</p>
        </div>
        <Link className="btn" href="/login">Przejdź do logowania</Link>
      </section>
    </main>
  );
}
