# KoLaboranci – wersja deweloperska

Chemiczna gra karciana (2k6) dla szkół. © 2026 CappySoft.pl

Gra to czysty HTML + CSS + JavaScript, **bez frameworków i bez instalowania czegokolwiek**.
Kod jest podzielony na małe pliki według odpowiedzialności, żeby łatwo było znaleźć i zmienić konkretną rzecz.

## Uruchomienie

Najprościej: otwórz `index.html` w przeglądarce (dwuklik). Skrypty są zwykłymi `<script src>`, więc działa także z `file://`.

Wygodniej (z automatycznym odświeżaniem w edytorze, np. VS Code → rozszerzenie *Live Server*) albo z dowolnym serwerem:

```bash
python3 -m http.server 8000      # potem http://localhost:8000
```

## Struktura

```
kolaboranci-dev/
├── index.html            szkielet strony: nagłówek, stół, panel boczny + lista skryptów
├── css/
│   └── style.css         cały wygląd: kolory obu motywów (:root), układ, karty, kości, okna
├── js/
│   ├── helpers.js        $, sleep, rnd, shuffle, esc – drobne narzędzia
│   ├── i18n.js           t() i tr(), wybór języka, pamięć ustawień (store)
│   ├── lang/
│   │   ├── pl.js         słownik interfejsu PL
│   │   └── en.js         słownik interfejsu EN (te same klucze co pl.js)
│   ├── theme.js          przełącznik motywu jasny/ciemny
│   ├── data.js           ★ DANE GRY: grupy, liderzy, pierwiastki, sprzęt, karty specjalne,
│   │                       Warunki reakcji, reakcje z równaniami
│   ├── art.js            grafiki SVG: model Bohra, ikony sprzętu, ilustracje reakcji
│   ├── state.js          stan gry (G), talia, nowa gra, dobieranie, dziennik, tryb „hot-seat”
│   ├── modal.js          okna dialogowe: ask(), pickCard(), pickSlot(), pickPlayer()
│   ├── cards.js          HTML pojedynczej karty (cardHTML, miniHTML)
│   ├── dice.js           rzut 2k6, modyfikatory, okno kart Warunków
│   ├── challenge.js      karta „Recenzja naukowa!” (pojedynek na kości)
│   ├── rules.js          mechanika: premie, efekty pierwiastków (EFF), sprzęt, reakcje, quiz
│   ├── turns.js          przebieg tury, AI komputerowych graczy, sprawdzanie zwycięstwa
│   ├── input.js          obsługa kliknięć gracza
│   ├── render.js         rysowanie stołu
│   └── setup.js          ekran nowej gry, zasady, start (ładowany jako ostatni)
└── tools/
    └── build.py          skleja wszystko w jeden plik dist/kolaboranci.html
```

### Kolejność skryptów ma znaczenie

Pliki nie są modułami ES – dzielą wspólny zakres globalny i ładują się po kolei (kolejność w `index.html`).
Plik może używać rzeczy zdefiniowanych **wcześniej** w momencie wykonania (np. `data.js` używa `T()` z `i18n.js`).
Wewnątrz funkcji można odwoływać się do rzeczy z dalszych plików, bo funkcje uruchamiają się dopiero po wczytaniu całości.
`setup.js` musi zostać na końcu – to on startuje grę.

## Najczęstsze zmiany

| Chcę… | Gdzie |
|---|---|
| dodać / zmienić pierwiastek, sprzęt, kartę specjalną | `js/data.js` (tablice `ELEMENTS`, `EQUIP`, `SPECIAL`) |
| dodać reakcję do przeprowadzenia | `js/data.js` → `REACTIONS` (+ ewentualnie premia w `rules.js` → `actBonus` / `reactBonus`) |
| dodać nowy efekt pierwiastka | opis w `data.js` → `EFFTEXT`, działanie w `rules.js` → obiekt `EFF` (ten sam klucz) |
| zmienić napis w interfejsie | `js/lang/pl.js` i `js/lang/en.js` (ten sam klucz w obu) |
| zmienić kolory | `css/style.css` → `:root` (jasny) oraz dwa bloki ciemnego motywu |
| zmienić zachowanie komputera | `js/turns.js` → `botTurn`, decyzje w `dice.js` / `challenge.js` |
| zmienić warunki wygranej | `js/state.js` (`needG`, `needR`) i `js/turns.js` → `checkWin` |

Każdy tekst w danych ma dwie wersje: `T('po polsku', 'in English')`.

### Nowy język

1. Skopiuj `js/lang/en.js` jako `js/lang/xx.js` i zmień `STR.en` na `STR.xx`.
2. Dopisz `<script src="js/lang/xx.js"></script>` w `index.html` (obok pozostałych słowników).
3. Dodaj przycisk `<button data-lang="xx">XX</button>` w nagłówku.
4. W `i18n.js` popraw odczyt zapamiętanego języka (teraz rozpoznaje tylko `en`).
5. Dane kart: dopisz wersję `xx` do funkcji `T()` (brakujące teksty spadają na polski).

## Budowanie wersji jednoplikowej

```bash
python3 tools/build.py
```

Powstaje `dist/kolaboranci.html` – jeden plik ze wszystkim w środku (bez zewnętrznych zależności poza czcionkami Google).
Ten plik można wgrać jako artefakt Claude, wysłać nauczycielom albo umieścić na stronie szkoły.
Nie edytuj go ręcznie – zmiany rób w `css/` i `js/`, a potem zbuduj ponownie.

## Pamięć w przeglądarce

Zapisywane są tylko dwie preferencje: `kolaboranci.lang` i `kolaboranci.theme` (localStorage).
Gra nie zbiera ani nie wysyła żadnych danych osobowych – imiona graczy istnieją tylko w pamięci karty przeglądarki.
