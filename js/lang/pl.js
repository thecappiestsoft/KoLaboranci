// KoLaboranci © 2026 CappySoft.pl
// Słownik interfejsu: POLSKI. Klucze muszą być takie same jak w en.js.
// {nazwa} w tekście zastępowana jest wartością podaną w kodzie, np. t('turnOf',{name:'Ola'}).

// Odmiana słowa „karta”: 1 kartę, 2–4 karty, 5+ kart (biernik) oraz 1 karta (mianownik).
const plCards=(n,nom)=>{const d=n%10,h=n%100;if(n===1)return nom?'karta':'kartę';if(d>=2&&d<=4&&(h<12||h>14))return 'karty';return 'kart'};

STR.pl={
  // nagłówek i stałe napisy strony
  tagline:'Chemiczna gra karciana · 2 k6',
  rules:'Zasady', newGame:'Nowa gra',
  reactionsHeader:'Reakcje do przeprowadzenia', lastRoll:'Ostatni rzut',
  rollHint:'Rzuć kośćmi, aktywując pierwiastek.', journal:'Dziennik laboratorium', groupsHeader:'Grupy pierwiastków',
  themeGroup:'Motyw', lightMode:'Tryb jasny', darkMode:'Tryb ciemny',

  // gracze
  botNames:['Laborantka Iza','Doktor Wolfram','Asystent Neon'],
  playerN:'Gracz {n}', human:'człowiek', computer:'komputer', yours:'Twój',
  cardsInHand:v=>`${v.n} ${plCards(v.n,true)} w ręce`, cardsInHandTitle:'Karty w ręce',

  // rodzaje kart
  chName:'Recenzja naukowa!', protected:'chroniony',
  kindEquip:'Sprzęt', kindCurse:'Przeklęty sprzęt', kindSpecial:'Reakcja specjalna', kindMod:'Warunki reakcji', kindCh:'Sprzeciw',
  modText:'Zagraj po dowolnym rzucie, by zmienić wynik.',
  chText:'Gdy ktoś zagrywa kartę, rzućcie kośćmi. Jeśli wyrzucisz więcej, karta przepada.',

  // stół
  progress:'{g}/{ng} grup · {r}/{nr} reakcji', emptyLab:'Puste laboratorium', reactionsList:'Reakcje',
  deckInfo:'Talia {d} · Odrzucone {x} · Reakcje w zapasie {r}',
  any:'dowolny', successThr:'sukces {n}+', failThr:'porażka ≤{n}: {pen}', reward:'Nagroda',
  doReaction:'Przeprowadź · 2 akcje', missingEls:'Brakuje pierwiastków', allReactionsDone:'Wszystkie reakcje przeprowadzone.',
  yourLab:'Twoje laboratorium', labOf:'Laboratorium: {name}', actions:'Akcje',
  gameOver:'Gra zakończona.', playing:'Trwa rozgrywanie…',
  yourTurn:'Twoja tura: wydaj akcje albo zakończ turę.', yourTurnNamed:'{name}, twoja tura: wydaj akcje albo zakończ turę.',
  noActions:'Brak akcji. Zakończ turę.',
  waitTurn:'Tura: {name}. Gdy możesz zareagować kartą Warunków lub Recenzji, gra o to zapyta.',
  btnDraw:'Dobierz kartę · 1', btnRedraw:'Wymień rękę · 3', btnEnd:'Zakończ turę',
  onBench:'Na stole laboratoryjnym · lider: {group} ({text})',
  usedThisTurn:'Użyty w tej turze', activate:'Aktywuj · {n}',
  emptyLabHint:'Zagraj pierwiastek z ręki, aby rozpocząć budowę laboratorium.',
  yourHand:'Twoja ręka', handOf:'Ręka: {name}',
  cardsHidden:v=>`Karty są zakryte. ${v.name} ma ${v.n} ${plCards(v.n)}.`,
  btnPlay:'Wprowadź · 1', btnEquip:'Załóż · {n}', btnUse:'Użyj · 1',
  afterRoll:'po rzucie', onRivalPlay:'na zagranie rywala', noCards:'Brak kart.',

  // kości i Warunki reakcji
  need:'potrzeba', rollOk:'udane', rollFail:'nieudane', withMods:'z warunkami', modChanged:'zmienione warunkami',
  noPlay:'Nie zagrywam', modAsk:'Zagrać Warunki reakcji?',
  modInfo:'{name} · {label}: wynik <b>{total}</b>, potrzeba <b>{thr}+</b>.', modReason:'Możesz zagrać kartę Warunków reakcji.',
  logPlaysMod:'{name} zagrywa {card} ({v}) → {total}',

  // Recenzja naukowa
  chReason:'{name} zagrywa kartę <b>{card}</b>. Możesz zgłosić Recenzję naukową.',
  chAsk:'Recenzja naukowa?',
  chBody:'{name} zagrywa kartę <b>{card}</b>. Zgłaszasz sprzeciw? Oboje rzucacie 2k6, wygrywa wyższy wynik (remis wygrywa zagrywający).',
  chYes:'Zgłaszam sprzeciw', chNo:'Przepuszczam',
  logCh:'{name} zgłasza Recenzję naukową wobec karty {card}!', chVs:'Recenzja: {a} kontra {b}',
  chRejected:'karta odrzucona', chPasses:'karta przechodzi',
  logChRoll:'Recenzja: {a} {av} kontra {b} {bv}.', logChLost:'Karta {card} trafia do odrzuconych.',
  burstRejected:'Odrzucone!', logChDefended:'{name} obronił(a) wynik.',

  // tryb kilku graczy na jednym urządzeniu
  hsIamShow:'Jestem {name}: pokaż', hsNoReact:'{name} nie reaguje', hsPass:'Przekaż urządzenie: {name}',
  hsLookAway:'Pozostali gracze, nie patrzcie na ekran.', hsGiveBack:'Oddaj urządzenie: {name}',
  hsSaved:'Twoja decyzja została zapisana.', hsIam:'Jestem {name}',
  turnOf:'Tura: {name}', passDeviceTurn:'Przekaż urządzenie temu graczowi. Pozostali, nie patrzcie na jego karty.',
  iamShowCards:'Jestem {name}: pokaż karty',

  // dziennik i efekty
  logNewGame:'Nowa gra: {v}.', variantShort:'wariant lekcyjny (4 grupy albo 2 reakcje)', variantFull:'pełna gra (6 grup albo 3 reakcje)',
  logReshuffle:'Talia przetasowana z odrzuconych.',
  logDraws:v=>`${v.name} dobiera ${v.n} ${plCards(v.n)}.`,
  noTarget:'Brak odpowiedniego celu.',
  logSteal:'{name} kradnie {el} od: {owner}.', logLose:'{name} traci {el}.',
  mustDiscard:v=>`${v.name} musi odrzucić ${v.n} ${plCards(v.n)}.`,
  discardN:'Odrzuć kartę ({i}/{n})', logDiscards:'{name} odrzuca: {card}.',
  noSuitableDiscard:'W odrzuconych nie ma odpowiedniej karty.', logTakesDiscard:'{name} bierze z odrzuconych: {card}.',
  qStealHandWho:'Od kogo weźmiesz kartę?', nobodyCards:'Nikt nie ma kart.', logStealHand:'{name} zabiera losową kartę graczowi {other}.',
  qStealEl:'Który pierwiastek ukraść?', qPeekWho:'Czyją rękę obejrzysz?', qPeekTake:'Ręka gracza {name}: weź 1 kartę',
  logPeek:'{name} zagląda w karty gracza {other} i bierze 1.', logIsElement:'To pierwiastek: {el}!',
  noElInHand:'Brak pierwiastków w ręce.', qWhichElPlay:'Który pierwiastek wprowadzić?', none:'Żaden',
  discard1:'Odrzuć 1 kartę', qDestroyEl:'Który pierwiastek zniszczyć?',
  qWhoDisc2:'Kto odrzuci 2 karty?', qWhoDisc1:'Kto odrzuci kartę?', mustDiscardCard:'Musisz odrzucić kartę',
  takeModTitle:'Weź kartę Warunków', qProtect:'Który pierwiastek chronić?', logProtected:'{el} jest chroniony do następnej tury.',
  takeDiscardTitle:'Weź kartę z odrzuconych', noElDiscard:'W odrzuconych nie ma pierwiastków.', qRevive:'Który pierwiastek przywrócić?',
  noEquipToDestroy:'Nie ma sprzętu do zniszczenia.', qWhoseEquip:'Czyj sprzęt zniszczyć?', logEquipDestroyed:'{eq} zniszczony ({owner}).',
  takeEquipTitle:'Weź sprzęt z odrzuconych', noFreeEl:'Nie masz wolnego pierwiastka na sprzęt.', oppNoEquip:'Przeciwnicy nie mają sprzętu.',
  qWhichEquip:'Który sprzęt przejąć?', qOntoWhich:'Na który twój pierwiastek?', logTakesEquip:'{name} przejmuje {eq}.',
  logPlace:'{name} wprowadza do laboratorium: <b>{el}</b>.', activation:'aktywacja {sym}',
  logActOk:'Aktywacja udana: {eff}', logActFail:'Aktywacja nieudana.',
  logEquip:'{name} zakłada {eq} na {el}.', logEquipOn:'{name} zakłada {eq} na {el} gracza {owner}.',
  logSpecial:'{name} zagrywa reakcję specjalną: <b>{card}</b>.', takeCardN:'Weź kartę ({i}/2)',
  logTop2:'{name} bierze 2 karty z wierzchu talii.', qOppElTake:'Który pierwiastek przeciwnika bierzesz?',
  qMyElGive:'Który swój pierwiastek oddajesz?', logSwap:'{name} zamienia {a} na {b} gracza {owner}.',
  explosionDiscard:'Wybuch! Odrzuć kartę', logPassLeft:'Każdy przekazuje losową kartę w lewo.',
  qEquipDestroy:'Który sprzęt zniszczyć?', logCorrode:'{eq} niszczeje ({owner}).',

  // reakcje i quiz
  logTry:'{name} próbuje przeprowadzić reakcję: <b>{r}</b>.', skipTask:'Pomijam zadanie', quizTitle:'Uzgodnij równanie (+2 do rzutu)',
  quizBody:'<p>Schemat reakcji <b>{r}</b>:</p><p class="eqn" style="font-size:16px">{q}</p><p>Wybierz poprawnie uzgodnione równanie. Pamiętaj: liczba atomów każdego pierwiastka musi być taka sama po obu stronach strzałki.</p>',
  logQuizOk:'Równanie uzgodnione poprawnie: +2.', logQuizBad:'Błędne równanie. Poprawnie: {ok}',
  almost:'Prawie!', correctIs:'Poprawne równanie to:', rollDiceBtn:'Rzucam kośćmi',
  logBotQuiz:'{name} poprawnie uzgadnia równanie: {ok} (+2).',
  logReactOk:'Reakcja zaszła! {name} zyskuje: {reward}', burstReactOk:'Reakcja zaszła!', burstReactRival:'Reakcja u rywala',
  logReactBad:'Reakcja wymknęła się spod kontroli! Kara dla: {name} ({pen}).', burstFailed:'Nieudana',
  penDisc1:'Kara: odrzuć 1 kartę', penDiscard:'Kara: odrzuć kartę', penWhichEl:'Kara: który pierwiastek tracisz?',
  logReactNone:'Reakcja nie zaszła, ale bez strat.',

  // tura i koniec gry
  logTooMany:'{name} ma za dużo kart (limit 7).', limit7:'Limit 7 kart: odrzuć kartę',
  whyReact:v=>`przeprowadzając ${v.n} ${v.n===1?'reakcję':'reakcje'}`, whyGroups:'kompletując laboratorium z {n} grup pierwiastków',
  logWins:'{name} wygrywa, {why}!', youWin:'Wygrywasz!', winner:'Wygrywa: {name}',
  reactionsDone:'Przeprowadzone reakcje', playAgain:'Zagraj jeszcze raz', close:'Zamknij',

  // kliknięcia gracza
  noTargetTitle:'Brak celu', noTargetCurse:'Żaden pierwiastek przeciwnika nie ma wolnego miejsca na sprzęt.',
  noTargetEquip:'Najpierw wprowadź pierwiastek bez sprzętu.', qOnWhose:'Na czyj pierwiastek?', qOnWhich:'Na który pierwiastek?',
  cancel:'Anuluj', notNow:'Nie teraz', noTargetNow:'Ta karta nie ma teraz celu.', logRedraw:'{name} wymienia całą rękę na 5 nowych kart.',

  // ekran nowej gry
  seatHuman:'Człowiek', seatBot:'Komputer', seatNone:'Puste',
  needTwo:'Potrzeba co najmniej 2 graczy.', needHuman:'Potrzeba co najmniej 1 człowieka.',
  setupIntro:'Ustaw do 4 miejsc. Kilka osób gra na zmianę na jednym urządzeniu, a gra zasłania karty między turami.',
  seat:'Miejsce {n}', nameLabel:'Imię', leaderLabel:'Lider', random:'Losowy', variant:'Wariant',
  variantShortBtn:'Lekcyjny · 4 grupy / 2 reakcje', variantFullBtn:'Pełny · 6 grup / 3 reakcje',
  startGame:'Rozpocznij grę',

  // zasady
  rulesTitle:'Zasady gry', letsGo:'Do dzieła',
  rulesHtml:`<p>Budujesz laboratorium z pierwiastków i przeprowadzasz reakcje chemiczne. Grasz z komputerowymi laborantami albo z innymi osobami na jednym urządzeniu (w „Nowa gra” ustaw miejsca jako Człowiek).</p>
   <h4>Gra z żywym przeciwnikiem</h4><ul><li>Na początku każdej tury gra zasłania karty i prosi o przekazanie urządzenia.</li><li>Gdy inny gracz może zareagować kartą Warunków lub Recenzji, gra prosi o oddanie mu urządzenia na chwilę. Może też od razu kliknąć „nie reaguje”.</li></ul>
   <h4>Jak wygrać</h4><ul><li>Zbierz w laboratorium pierwiastki z wymaganej liczby różnych grup (twój lider też się liczy), albo</li><li>przeprowadź wymaganą liczbę reakcji.</li></ul>
   <h4>Twoja tura: 3 akcje</h4><ul>
    <li><b>Dobierz kartę</b> (1). <b>Wymień całą rękę</b> na 5 nowych kart (3).</li>
    <li><b>Wprowadź pierwiastek</b> (1): kładziesz go na stół i od razu rzucasz 2k6. Wynik równy progowi (np. 7+) lub wyższy uruchamia jego efekt.</li>
    <li><b>Aktywuj</b> pierwiastek leżący na stole (1, raz na turę każdy).</li>
    <li><b>Załóż sprzęt</b> lub <b>użyj reakcji specjalnej</b> (1).</li>
    <li><b>Przeprowadź reakcję</b> (2): musisz mieć wymagane grupy. Najpierw możesz uzgodnić równanie: poprawna odpowiedź daje +2 do rzutu.</li></ul>
   <h4>Karty reakcji na cudze ruchy</h4><ul>
    <li><b>Warunki reakcji</b>: po dowolnym rzucie dodaj albo odejmij podaną wartość.</li>
    <li><b>Recenzja naukowa!</b>: gdy rywal zagrywa kartę, rzucacie 2k6. Jeśli wyrzucisz więcej, jego karta przepada.</li></ul>
   <h4>Ważne</h4><ul><li>Gazy szlachetne są obojętne: nie da się ich ukraść. Złoto nie koroduje: nie da się go zniszczyć.</li><li>Na koniec tury możesz mieć najwyżej 7 kart.</li></ul>`
};
