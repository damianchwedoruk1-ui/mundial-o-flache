# Liga Mundialowa — wersja online startowa

To jest szkielet pod wersję online: Next.js + Supabase.
Grafika jest jeszcze robocza, logika gry będzie dokładana etapami.

## Co jest w środku

- ekran logowania,
- dashboard,
- przykładowe mecze,
- przykładowa tabela,
- karty mocy,
- plik SQL do Supabase,
- miejsce pod prawdziwe zapisy typów i wyników.

## Jak uruchomić lokalnie

1. Zainstaluj Node.js.
2. Wejdź do folderu projektu.
3. Uruchom:

```bash
npm install
npm run dev
```

4. Otwórz:

```text
http://localhost:3000
```

## Supabase

1. Załóż projekt w Supabase.
2. W SQL Editor wklej zawartość pliku:

```text
supabase/schema.sql
```

3. Skopiuj plik `.env.example` jako `.env.local`.
4. Wklej dane Supabase:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Konta graczy

Na start najlepiej stworzyć 4 konta ręcznie w Supabase Auth:

- Damian
- Andrzej
- Fabian
- Michał

Potem w tabeli `profiles` trzeba dopisać ich nazwy i role.
Damian może mieć rolę `admin`, reszta `player`.

## Następny krok

Podpiąć dashboard pod prawdziwe dane z Supabase:

- standings,
- matches,
- predictions,
- event_logs.
