// KoLaboranci © 2026 CappySoft.pl
// DANE GRY – tu dodajesz i zmieniasz karty: grupy, liderów, pierwiastki, sprzęt,
// reakcje specjalne, Warunki reakcji i reakcje do przeprowadzenia (z równaniami).
// Każdy tekst ma dwie wersje: T('po polsku', 'in English').

// ---------- data ----------
const GROUPS={
  alk:{name:T('Metale alkaliczne','Alkali metals'),short:T('alkaliczne','alkali')},
  zal:{name:T('Metale ziem alkalicznych','Alkaline earth metals'),short:T('ziem alkal.','alk. earth')},
  prz:{name:T('Metale przejściowe','Transition metals'),short:T('przejściowe','transition')},
  nme:{name:T('Niemetale','Non-metals'),short:T('niemetale','non-metals')},
  hal:{name:T('Halogeny','Halogens'),short:T('halogeny','halogens')},
  gaz:{name:T('Gazy szlachetne','Noble gases'),short:T('gazy szl.','noble gases')}
};
const GORDER=['alk','zal','prz','nme','hal','gaz'];
const gv=g=>`--g:var(--g-${g})`;

const LEADERS=[
 {id:'davy',name:'Humphry Davy',ini:'HD',g:'alk',
  text:T('+1 do aktywacji metali alkalicznych.','+1 to activating alkali metals.'),
  fact:T('W 1807 r. otrzymał sód i potas metodą elektrolizy.','In 1807 he isolated sodium and potassium by electrolysis.')},
 {id:'curie',name:'Maria Skłodowska-Curie',ini:'MSC',g:'zal',
  text:T('+1 do każdej próby reakcji.','+1 to every reaction attempt.'),
  fact:T('Odkryła polon i rad. Dwukrotna laureatka Nagrody Nobla.','Discovered polonium and radium. Two-time Nobel Prize winner.')},
 {id:'czo',name:'Jan Czochralski',ini:'JC',g:'prz',
  text:T('+1 do aktywacji metali przejściowych.','+1 to activating transition metals.'),
  fact:T('Jego metoda hodowli monokryształów służy dziś do produkcji krzemu do układów scalonych.','His crystal-growing method is still used to make the silicon in computer chips.')},
 {id:'lav',name:'Antoine Lavoisier',ini:'AL',g:'nme',
  text:T('„Nic nie ginie”: gdy twój pierwiastek zostanie zniszczony, dobierz 1 kartę.','"Nothing is lost": when one of your elements is destroyed, draw 1 card.'),
  fact:T('Sformułował prawo zachowania masy, nadał nazwy tlenowi i wodorowi.','Formulated the law of conservation of mass and named oxygen and hydrogen.')},
 {id:'moi',name:'Henri Moissan',ini:'HM',g:'hal',
  text:T('Po udanej aktywacji halogenu dobierz 1 kartę.','After a successful halogen activation, draw 1 card.'),
  fact:T('W 1886 r. jako pierwszy otrzymał wolny fluor. Nobel 1906.','In 1886 he was the first to isolate fluorine. Nobel Prize 1906.')},
 {id:'ram',name:'William Ramsay',ini:'WR',g:'gaz',
  text:T('+1 do aktywacji gazów szlachetnych i +1 w pojedynkach Recenzji.','+1 to activating noble gases and +1 in Peer Review duels.'),
  fact:T('Odkrył argon (z lordem Rayleighem), neon, krypton i ksenon.','Discovered argon (with Lord Rayleigh), neon, krypton and xenon.')}
];

// symbol, nazwa, liczba atomowa, grupa, próg aktywacji, efekt, elektrony na powłokach, ciekawostka
const ELEMENTS=[
 ['Li',T('Lit','Lithium'),3,'alk',6,'stealHand',[2,1],T('Najlżejszy metal. Podstawa baterii litowo-jonowych.','The lightest metal. The heart of lithium-ion batteries.')],
 ['Na',T('Sód','Sodium'),11,'alk',8,'stealEl',[2,8,1],T('Tak miękki, że da się go kroić nożem.','So soft you can cut it with a knife.')],
 ['K',T('Potas','Potassium'),19,'alk',9,'stealElDraw',[2,8,8,1],T('W wodzie wodór zapala się fioletowym płomieniem.','In water, the hydrogen it releases burns with a violet flame.')],
 ['Rb',T('Rubid','Rubidium'),37,'alk',7,'peekTake',[2,8,18,8,1],T('Topi się w ok. 39°C, czyli w gorący dzień.','Melts at about 39°C – on a hot summer day.')],
 ['Cs',T('Cez','Caesium'),55,'alk',10,'stealEl2',[2,8,18,18,8,1],T('Wyznacza sekundę w zegarach atomowych.','Defines the second in atomic clocks.')],
 ['Be',T('Beryl','Beryllium'),4,'zal',6,'draw2',[2,2],T('Z berylu są lustra Teleskopu Jamesa Webba.','The James Webb Space Telescope’s mirrors are made of beryllium.')],
 ['Mg',T('Magnez','Magnesium'),12,'zal',7,'drawPlay',[2,8,2],T('Spala się oślepiająco białym płomieniem.','Burns with a blinding white flame.')],
 ['Ca',T('Wapń','Calcium'),20,'zal',8,'freePlay',[2,8,8,2],T('Buduje kości, zęby i skały wapienne.','Builds bones, teeth and limestone.')],
 ['Sr',T('Stront','Strontium'),38,'zal',7,'draw3disc1',[2,8,18,8,2],T('Barwi fajerwerki na czerwono.','Turns fireworks red.')],
 ['Ba',T('Bar','Barium'),56,'zal',9,'draw3',[2,8,18,18,8,2],T('BaSO₄ to kontrast do zdjęć RTG.','BaSO₄ is the contrast agent for X-rays.')],
 ['F',T('Fluor','Fluorine'),9,'hal',10,'destroyDraw',[2,7],T('Najbardziej elektroujemny pierwiastek.','The most electronegative element.')],
 ['Cl',T('Chlor','Chlorine'),17,'hal',8,'destroy',[2,8,7],T('Żółtozielony gaz, dezynfekuje wodę w basenach.','A yellow-green gas that disinfects swimming pools.')],
 ['Br',T('Brom','Bromine'),35,'hal',7,'disc2',[2,8,18,7],T('Jedyny niemetal, który w temp. pokojowej jest cieczą.','The only non-metal that is liquid at room temperature.')],
 ['I',T('Jod','Iodine'),53,'hal',6,'disc1',[2,8,18,18,7],T('Ogrzany tworzy fioletowe pary (sublimacja).','When heated, it turns straight into violet vapour (sublimation).')],
 ['At',T('Astat','Astatine'),85,'hal',9,'allDisc1',[2,8,18,32,18,7],T('Jeden z najrzadszych pierwiastków w skorupie ziemskiej.','One of the rarest elements in the Earth’s crust.')],
 ['He',T('Hel','Helium'),2,'gaz',6,'draw1',[2],T('Lżejszy od powietrza, unosi balony.','Lighter than air – it lifts balloons.')],
 ['Ne',T('Neon','Neon'),10,'gaz',7,'takeMod',[2,8],T('Świeci czerwonopomarańczowo w reklamach.','Glows red-orange in neon signs.')],
 ['Ar',T('Argon','Argon'),18,'gaz',7,'protect',[2,8,8],T('Prawie 1% powietrza. Osłania spoiny przy spawaniu.','Almost 1% of the air. Shields the weld during welding.')],
 ['Kr',T('Krypton','Krypton'),36,'gaz',8,'peekTake',[2,8,18,8],T('Nazwa pochodzi od greckiego „ukryty”.','Its name comes from the Greek word for “hidden”.')],
 ['Xe',T('Ksenon','Xenon'),54,'gaz',9,'destroy',[2,8,18,18,8],T('Wyjątek wśród gazów szlachetnych: tworzy związki, np. XeF₄.','An exception among noble gases: it forms compounds, e.g. XeF₄.')],
 ['H',T('Wodór','Hydrogen'),1,'nme',6,'takeDiscard',[1],T('Najpowszechniejszy pierwiastek we Wszechświecie.','The most abundant element in the Universe.')],
 ['C',T('Węgiel','Carbon'),6,'nme',8,'revive',[2,4],T('Diament i grafit to ten sam pierwiastek.','Diamond and graphite are the same element.')],
 ['N',T('Azot','Nitrogen'),7,'nme',7,'draw2',[2,5],T('Stanowi ok. 78% powietrza.','Makes up about 78% of the air.')],
 ['O',T('Tlen','Oxygen'),8,'nme',8,'destroyEquip',[2,6],T('Ok. 21% powietrza. Podtrzymuje spalanie.','About 21% of the air. Supports combustion.')],
 ['S',T('Siarka','Sulfur'),16,'nme',7,'discDraw',[2,8,6],T('Żółte ciało stałe, występuje przy wulkanach.','A yellow solid found around volcanoes.')],
 ['Fe',T('Żelazo','Iron'),26,'prz',6,'takeEquip',[2,8,14,2],T('Rdzewieje. Jest w hemoglobinie krwi.','It rusts. It is part of the haemoglobin in blood.')],
 ['Cu',T('Miedź','Copper'),29,'prz',7,'moveEquip',[2,8,18,1],T('Świetny przewodnik, z niej robi się kable.','An excellent conductor – used for electric wires.')],
 ['Zn',T('Cynk','Zinc'),30,'prz',8,'protect',[2,8,18,2],T('Cynkowanie chroni stal przed korozją.','Galvanising protects steel from corrosion.')],
 ['Ag',T('Srebro','Silver'),47,'prz',7,'drawAg',[2,8,18,18,1],T('Najlepiej przewodzi prąd i ciepło.','The best conductor of electricity and heat.')],
 ['Au',T('Złoto','Gold'),79,'prz',10,'draw3',[2,8,18,32,18,1],T('Nie koroduje. Ta karta jest niezniszczalna.','It does not corrode. This card cannot be destroyed.')]
];
const EFFTEXT={
 stealHand:T('Weź losowo 1 kartę z ręki wybranego przeciwnika.','Take a random card from a chosen opponent’s hand.'),
 stealEl:T('Ukradnij 1 pierwiastek przeciwnika.','Steal 1 element from an opponent.'),
 stealElDraw:T('Ukradnij 1 pierwiastek przeciwnika i dobierz 1 kartę.','Steal 1 element from an opponent and draw 1 card.'),
 peekTake:T('Obejrzyj rękę przeciwnika i weź z niej 1 wybraną kartę.','Look at an opponent’s hand and take 1 card of your choice.'),
 stealEl2:T('Ukradnij 2 pierwiastki przeciwników.','Steal 2 elements from opponents.'),
 draw1:T('Dobierz 1 kartę.','Draw 1 card.'), draw2:T('Dobierz 2 karty.','Draw 2 cards.'), draw3:T('Dobierz 3 karty.','Draw 3 cards.'),
 drawPlay:T('Dobierz 1 kartę. Jeśli to pierwiastek, od razu wprowadź go do laboratorium.','Draw 1 card. If it is an element, put it into your lab right away.'),
 freePlay:T('Wprowadź 1 pierwiastek z ręki bez kosztu akcji.','Put 1 element from your hand into your lab at no action cost.'),
 draw3disc1:T('Dobierz 3 karty, potem odrzuć 1.','Draw 3 cards, then discard 1.'),
 destroyDraw:T('Zniszcz 1 pierwiastek przeciwnika i dobierz 1 kartę.','Destroy 1 opponent’s element and draw 1 card.'),
 destroy:T('Zniszcz 1 pierwiastek przeciwnika.','Destroy 1 opponent’s element.'),
 disc2:T('Wybrany przeciwnik odrzuca 2 karty.','A chosen opponent discards 2 cards.'),
 disc1:T('Wybrany przeciwnik odrzuca 1 kartę.','A chosen opponent discards 1 card.'),
 allDisc1:T('Każdy przeciwnik odrzuca 1 kartę.','Every opponent discards 1 card.'),
 takeMod:T('Weź z odrzuconych 1 kartę Warunków reakcji.','Take 1 Reaction Conditions card from the discard pile.'),
 protect:T('Twój wybrany pierwiastek jest chroniony do twojej następnej tury.','One of your elements is protected until your next turn.'),
 takeDiscard:T('Weź 1 dowolną kartę z odrzuconych.','Take any 1 card from the discard pile.'),
 revive:T('Weź pierwiastek z odrzuconych i od razu wprowadź go do laboratorium.','Take an element from the discard pile and put it straight into your lab.'),
 destroyEquip:T('Zniszcz 1 kartę sprzętu u przeciwnika (albo zanieczyszczenie u siebie).','Destroy 1 opponent’s equipment card (or a Contamination on your own element).'),
 discDraw:T('Wybrany przeciwnik odrzuca 1 kartę, a ty dobierasz 1.','A chosen opponent discards 1 card and you draw 1.'),
 takeEquip:T('Weź 1 kartę sprzętu z odrzuconych.','Take 1 equipment card from the discard pile.'),
 moveEquip:T('Przenieś sprzęt z pierwiastka przeciwnika na swój.','Move equipment from an opponent’s element to one of yours.'),
 drawAg:T('Dobierz 1 kartę. Jeśli to karta Warunków, dobierz jeszcze 1.','Draw 1 card. If it is a Conditions card, draw 1 more.')
};
const PASSIVE={gaz:T('Gaz szlachetny: nie można go ukraść.','Noble gas: cannot be stolen.'),Au:T('Nie można go zniszczyć.','Cannot be destroyed.')};

// id, nazwa, liczba kopii w talii, opis
const EQUIP=[
 ['rekawice',T('Rękawice ochronne','Safety gloves'),1,T('Ten pierwiastek nie może zostać zniszczony.','This element cannot be destroyed.')],
 ['fartuch',T('Fartuch laboratoryjny','Lab coat'),1,T('Tego pierwiastka nie można ukraść.','This element cannot be stolen.')],
 ['okulary',T('Okulary ochronne','Safety goggles'),2,T('+1 do aktywacji tego pierwiastka.','+1 to activating this element.')],
 ['termometr',T('Termometr','Thermometer'),1,T('+1 do aktywacji tego pierwiastka.','+1 to activating this element.')],
 ['palnik',T('Palnik Bunsena','Bunsen burner'),1,T('+2 do aktywacji tego pierwiastka.','+2 to activating this element.')],
 ['zlewka',T('Zlewka miarowa','Measuring beaker'),1,T('Ten pierwiastek liczy się podwójnie w wymaganiach reakcji.','This element counts twice for reaction requirements.')],
 ['katalizator',T('Katalizator','Catalyst'),1,T('+1 do każdej twojej próby reakcji.','+1 to each of your reaction attempts.')],
 ['pipeta',T('Pipeta','Pipette'),1,T('Aktywacja tego pierwiastka nie kosztuje akcji.','Activating this element costs no action.')],
 ['zanieczyszczenie',T('Zanieczyszczenie','Contamination'),2,T('Kładziesz na pierwiastek przeciwnika: −2 do jego aktywacji.','Place it on an opponent’s element: −2 to its activation.')]
];
const SPECIAL=[
 ['uklad',T('Układ okresowy','Periodic table'),2,T('Obejrzyj 5 wierzchnich kart talii, weź 2, resztę połóż pod spód.','Look at the top 5 cards of the deck, take 2, put the rest at the bottom.')],
 ['elektroliza',T('Elektroliza','Electrolysis'),2,T('Zniszcz 1 pierwiastek przeciwnika.','Destroy 1 opponent’s element.')],
 ['wymiana',T('Reakcja wymiany','Displacement reaction'),1,T('Zamień 1 swój pierwiastek na 1 pierwiastek przeciwnika.','Swap 1 of your elements for 1 of an opponent’s.')],
 ['destylacja',T('Destylacja','Distillation'),1,T('Weź 2 karty z odrzuconych.','Take 2 cards from the discard pile.')],
 ['wybuch',T('Wybuch w pracowni','Lab explosion'),1,T('Każdy gracz (ty też) odrzuca 2 karty.','Every player (you too) discards 2 cards.')],
 ['synteza',T('Synteza','Synthesis'),1,T('Dobierz 2 karty.','Draw 2 cards.')],
 ['wietrzenie',T('Wietrzenie pracowni','Airing the lab'),1,T('Każdy gracz oddaje 1 losową kartę graczowi po lewej.','Every player passes 1 random card to the player on their left.')],
 ['korozja',T('Korozja','Corrosion'),1,T('Zniszcz 1 kartę sprzętu przeciwnika i dobierz 1 kartę.','Destroy 1 opponent’s equipment card and draw 1 card.')]
];
// nazwa, premia +, kara −, liczba kopii
const MODS=[[T('Podgrzanie / Schłodzenie','Heating / Cooling'),2,2,6],[T('Katalizator / Inhibitor','Catalyst / Inhibitor'),1,3,4],[T('Wysokie ciśnienie / Próżnia','High pressure / Vacuum'),3,1,4],[T('Rozcieńczenie','Dilution'),0,4,2],[T('Stężenie','Concentration'),4,0,2]];

// nazwa, wymagania, próg sukcesu, próg porażki, kara, klucz nagrody, opis nagrody,
// schemat, poprawne równanie, [2 błędne], kolor grupy, ilustracja
const REACTIONS=[
 [T('Spalanie magnezu','Burning magnesium'),[['zal',1],['any',1]],8,4,'disc1','r_mg',T('+1 do aktywacji metali ziem alkalicznych.','+1 to activating alkaline earth metals.'),'Mg + O₂ → MgO','2Mg + O₂ → 2MgO',['Mg + O₂ → 2MgO','2Mg + 2O₂ → 2MgO'],'zal','flame'],
 [T('Sód i woda','Sodium and water'),[['alk',1],['any',2]],8,5,'destroy1','r_na',T('+1 do aktywacji metali alkalicznych.','+1 to activating alkali metals.'),'Na + H₂O → NaOH + H₂','2Na + 2H₂O → 2NaOH + H₂',['Na + H₂O → NaOH + H₂','2Na + H₂O → 2NaOH + H₂'],'alk','splash'],
 [T('Synteza wody','Making water'),[['nme',2]],7,4,'disc1','r_h2o',T('+1 do aktywacji niemetali.','+1 to activating non-metals.'),'H₂ + O₂ → H₂O','2H₂ + O₂ → 2H₂O',['H₂ + O₂ → 2H₂O','2H₂ + 2O₂ → 2H₂O'],'nme','drop'],
 [T('Rdzewienie żelaza','Rusting of iron'),[['prz',1],['nme',1]],9,5,'disc1','r_fe',T('+1 do aktywacji metali przejściowych.','+1 to activating transition metals.'),'Fe + O₂ → Fe₂O₃','4Fe + 3O₂ → 2Fe₂O₃',['2Fe + 3O₂ → Fe₂O₃','2Fe + O₂ → Fe₂O₃'],'prz','rust'],
 [T('Zobojętnianie','Neutralisation'),[['alk',1],['hal',1],['nme',1]],8,5,'disc2','r_neut',T('+2, gdy bronisz się przed Recenzją.','+2 when defending against Peer Review.'),'NaOH + HCl → NaCl + H₂O','NaOH + HCl → NaCl + H₂O',['2NaOH + HCl → NaCl + 2H₂O','NaOH + 2HCl → NaCl + H₂O'],'hal','beaker'],
 [T('Synteza soli kuchennej','Making table salt'),[['alk',1],['hal',1]],9,5,'destroy1','r_salt',T('Na początku tury dobierasz 1 kartę.','Draw 1 card at the start of your turn.'),'Na + Cl₂ → NaCl','2Na + Cl₂ → 2NaCl',['Na + Cl₂ → NaCl','Na + Cl₂ → 2NaCl'],'alk','crystal'],
 [T('Fotosynteza','Photosynthesis'),[['nme',2],['any',1]],10,6,'disc2','r_photo',T('+1 do aktywacji wszystkich pierwiastków.','+1 to activating all elements.'),'CO₂ + H₂O → C₆H₁₂O₆ + O₂','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',['CO₂ + H₂O → C₆H₁₂O₆ + O₂','6CO₂ + 6H₂O → C₆H₁₂O₆ + 3O₂'],'nme','leaf'],
 [T('Spalanie metanu','Burning methane'),[['nme',1],['any',2]],9,5,'disc1','r_ch4',T('+1 do każdej próby reakcji.','+1 to every reaction attempt.'),'CH₄ + O₂ → CO₂ + H₂O','CH₄ + 2O₂ → CO₂ + 2H₂O',['CH₄ + O₂ → CO₂ + 2H₂O','CH₄ + 2O₂ → CO₂ + H₂O'],'zal','flame'],
 [T('Rozkład wody utlenionej','Decomposing hydrogen peroxide'),[['nme',1],['prz',1]],7,4,'disc1','r_h2o2',T('Raz na turę zakładasz sprzęt bez kosztu akcji.','Once per turn, attach equipment at no action cost.'),'H₂O₂ → H₂O + O₂','2H₂O₂ → 2H₂O + O₂',['H₂O₂ → H₂O + O₂','2H₂O₂ → H₂O + O₂'],'nme','bubbles'],
 [T('Gaszenie wapna','Slaking lime'),[['zal',1],['nme',1],['any',1]],8,5,'disc1','r_cao',T('Twoich metali ziem alkalicznych nie można ukraść.','Your alkaline earth metals cannot be stolen.'),'CaO + H₂O → Ca(OH)₂','CaO + H₂O → Ca(OH)₂',['2CaO + H₂O → Ca(OH)₂','CaO + 2H₂O → Ca(OH)₂'],'zal','steam'],
 [T('Wypieranie miedzi','Displacing copper'),[['prz',2]],8,5,'destroy1','r_cu',T('Twoich metali przejściowych nie można zniszczyć.','Your transition metals cannot be destroyed.'),'Fe + CuSO₄ → FeSO₄ + Cu','Fe + CuSO₄ → FeSO₄ + Cu',['2Fe + CuSO₄ → FeSO₄ + 2Cu','Fe + 2CuSO₄ → FeSO₄ + Cu'],'prz','nail'],
 [T('Fluorek ksenonu','Xenon tetrafluoride'),[['gaz',1],['hal',1]],11,6,'disc2','r_xef4',T('+1 do aktywacji gazów; gazy liczą się jako dowolna grupa w wymaganiach.','+1 to activating noble gases; noble gases count as any group for requirements.'),'Xe + F₂ → XeF₄','Xe + 2F₂ → XeF₄',['Xe + F₂ → XeF₄','2Xe + F₂ → XeF₄'],'gaz','molecule']
];
const PENTEXT={disc1:T('odrzuć 1 kartę','discard 1 card'),disc2:T('odrzuć 2 karty','discard 2 cards'),destroy1:T('zniszcz 1 swój pierwiastek','destroy 1 of your elements')};
