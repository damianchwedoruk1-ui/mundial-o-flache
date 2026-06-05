import Link from "next/link";

export default function RegulaminPage() {
  return (
    <main className="page">
      <section
        className="panel"
        style={{ maxWidth: 1000, margin: "0 auto", lineHeight: 1.8, padding: "28px" }}
      >
        <div className="regulamin-header">
          <div>
            <div className="worldcup-kicker">World Cup 2026</div>
            <h1 style={{ marginBottom: 8 }}>📜 Regulamin Ligi Mundialowej</h1>

            <div className="muted">
              Oficjalne zasady prywatnej ligi typowania Mundialu.
            </div>
          </div>

          <Link href="/dashboard" className="back-btn">
            ⬅ Powrót do ligi
          </Link>
        </div>

        <h2>1. Informacje ogólne</h2>

        <ul>
          <li>Gra polega na typowaniu wyników meczów Mundialu i zdobywaniu punktów.</li>
          <li>Gra ma charakter wyłącznie rozrywkowy.</li>
          <li>W rozgrywce bierze udział 4 graczy.</li>
          <li>Każdy gracz posiada własne konto.</li>
          <li>Jeden z graczy posiada uprawnienia administratora.</li>
        </ul>

        <h2>2. Dzień meczowy</h2>

        <ul>
          <li>Dzień meczowy odpowiada jednemu dniowi kalendarzowemu.</li>
          <li>Mecze między 00:00 a 23:59 należą do tego samego dnia.</li>
          <li>Deadline typowania ustawiony jest na godzinę 00:00.</li>
          <li>Po 00:00 typowanie zostaje zablokowane.</li>
        </ul>

        <h2>3. Typowanie meczów</h2>

        <ul>
          <li>Typowanie otwiera się automatycznie o 18:00 dnia poprzedzającego.</li>
          <li>Typy można dodawać, edytować i usuwać do zamknięcia typowania.</li>
          <li>Brak typu oznacza 0 punktów za mecz.</li>
          <li>Typy innych graczy są ukryte do zakończenia deadline’u.</li>
        </ul>

        <h2>4. Punktacja</h2>

        <div className="panel" style={{ marginTop: 20 }}>
          <h3>🎯 Trafienie dokładnego wyniku</h3>

          <ul>
            <li><strong>5 punktów</strong> — jeśli tylko jeden gracz trafi dokładny wynik.</li>
            <li><strong>4 punkty</strong> — jeśli dokładny wynik trafi kilku graczy.</li>
          </ul>

          <h3>📏 Najbliższy wynik</h3>

          <ul>
            <li><strong>2 punkty</strong> — najbliższy typ.</li>
            <li><strong>1 punkt</strong> — jeśli kilku graczy było równie blisko.</li>
          </ul>
        </div>

        <h2>5. Moce</h2>

        <ul>
          <li>Każda moc może zostać użyta tylko raz podczas całego turnieju.</li>
          <li>Moce dzielą się na poranne i wieczorne.</li>
          <li>Użycie mocy porannej blokuje wieczorną tego samego dnia.</li>
        </ul>

        <h2>6. Moce poranne</h2>

        <div className="panel" style={{ marginTop: 20 }}>
          <h3>💥 Vabank</h3>
          <p>Punkty dnia mnożone są x2. Zdobycie 0 punktów daje karę -4.</p>

          <h3>🪞 Rozdwojenie Jaźni</h3>
          <p>Możliwość podania dwóch typów dla jednego meczu.</p>

          <h3>⚽ Goleador</h3>
          <p>+1 punkt za każdą bramkę wybranej drużyny.</p>
        </div>

        <h2>7. Moce wieczorne</h2>

        <div className="panel" style={{ marginTop: 20 }}>
          <h3>🔄 Słabiak</h3>
          <p>Odwraca punktację dnia wszystkim graczom.</p>

          <h3>🔁 Zamianka</h3>
          <p>Zamienia punkty dnia między dwoma graczami.</p>

          <h3>🛡️ Blokada</h3>
          <p>Chroni przed Zamianką i Złodziejem.</p>

          <h3>🦹 Złodziej</h3>
          <p>Kradnie cały dorobek punktowy wybranego gracza.</p>
        </div>

        <h2>8. Kolejność rozliczania mocy</h2>

        <ul>
          <li>Najpierw liczone są punkty za mecze.</li>
          <li>Następnie aktywowane są Blokady.</li>
          <li>Pozostałe moce rozliczane są według czasu użycia.</li>
        </ul>

        <h2>9. Tabela główna</h2>

        <ul>
          <li>Punkty z każdego dnia dodawane są do tabeli głównej.</li>
          <li>Punkty mogą być ujemne.</li>
          <li>Przy remisie wyżej jest gracz z większą liczbą trafionych wyników.</li>
        </ul>

        <h2>10. Administrator</h2>

        <ul>
          <li>Wpisywanie wyników końcowych.</li>
          <li>Poprawianie błędów systemowych.</li>
          <li>Ponowne przeliczanie punktów.</li>
        </ul>

        <h2>11. Historia zdarzeń</h2>

        <ul>
          <li>System zapisuje historię ważnych działań.</li>
          <li>Historia obejmuje użycie mocy i zmiany punktów.</li>
          <li>Historia widoczna jest po zakończeniu dnia meczowego.</li>
        </ul>
      </section>
    </main>
  );
}