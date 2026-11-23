// KoLaboranci © 2026 CappySoft.pl
// Interface dictionary: ENGLISH. Keys must match pl.js.
// {name} in a string is replaced with the value passed in code, e.g. t('turnOf',{name:'Ola'}).

const enCards=n=>n===1?'card':'cards';

STR.en={
  // header and static page text
  tagline:'A chemistry card game · 2d6',
  rules:'Rules', newGame:'New game',
  reactionsHeader:'Reactions to carry out', lastRoll:'Last roll',
  rollHint:'Roll the dice by activating an element.', journal:'Lab journal', groupsHeader:'Element groups',
  themeGroup:'Theme', lightMode:'Light mode', darkMode:'Dark mode',

  // players
  botNames:['Lab Tech Iza','Doctor Wolfram','Assistant Neon'],
  playerN:'Player {n}', human:'human', computer:'computer', yours:'Yours',
  cardsInHand:v=>`${v.n} ${enCards(v.n)} in hand`, cardsInHandTitle:'Cards in hand',

  // card types
  chName:'Peer Review!', protected:'protected',
  kindEquip:'Equipment', kindCurse:'Cursed equipment', kindSpecial:'Special reaction', kindMod:'Reaction conditions', kindCh:'Objection',
  modText:'Play after any roll to change the result.',
  chText:'When someone plays a card, you both roll the dice. If you roll higher, their card is lost.',

  // table
  progress:'{g}/{ng} groups · {r}/{nr} reactions', emptyLab:'Empty lab', reactionsList:'Reactions',
  deckInfo:'Deck {d} · Discarded {x} · Reactions left {r}',
  any:'any', successThr:'success {n}+', failThr:'failure ≤{n}: {pen}', reward:'Reward',
  doReaction:'Carry out · 2 actions', missingEls:'Missing elements', allReactionsDone:'All reactions have been carried out.',
  yourLab:'Your lab', labOf:'Lab: {name}', actions:'Actions',
  gameOver:'Game over.', playing:'Playing…',
  yourTurn:'Your turn: spend your actions or end your turn.', yourTurnNamed:'{name}, your turn: spend your actions or end your turn.',
  noActions:'No actions left. End your turn.',
  waitTurn:'Turn: {name}. If you can respond with a Conditions or Peer Review card, the game will ask you.',
  btnDraw:'Draw a card · 1', btnRedraw:'Swap hand · 3', btnEnd:'End turn',
  onBench:'On the lab bench · leader: {group} ({text})',
  usedThisTurn:'Used this turn', activate:'Activate · {n}',
  emptyLabHint:'Play an element from your hand to start building your lab.',
  yourHand:'Your hand', handOf:'Hand: {name}',
  cardsHidden:v=>`Cards are face down. ${v.name} has ${v.n} ${enCards(v.n)}.`,
  btnPlay:'Play · 1', btnEquip:'Attach · {n}', btnUse:'Use · 1',
  afterRoll:'after a roll', onRivalPlay:'on a rival’s play', noCards:'No cards.',

  // dice and Reaction Conditions
  need:'need', rollOk:'success', rollFail:'failed', withMods:'with conditions', modChanged:'changed by conditions',
  noPlay:'Don’t play', modAsk:'Play Reaction Conditions?',
  modInfo:'{name} · {label}: result <b>{total}</b>, need <b>{thr}+</b>.', modReason:'You can play a Reaction Conditions card.',
  logPlaysMod:'{name} plays {card} ({v}) → {total}',

  // Peer Review
  chReason:'{name} plays <b>{card}</b>. You can call for a Peer Review.',
  chAsk:'Peer Review?',
  chBody:'{name} plays <b>{card}</b>. Do you object? You both roll 2d6 and the higher result wins (the card’s owner wins ties).',
  chYes:'I object', chNo:'Let it pass',
  logCh:'{name} calls for a Peer Review of {card}!', chVs:'Peer Review: {a} vs {b}',
  chRejected:'card rejected', chPasses:'card goes through',
  logChRoll:'Peer Review: {a} {av} vs {b} {bv}.', logChLost:'{card} goes to the discard pile.',
  burstRejected:'Rejected!', logChDefended:'{name} defended the result.',

  // several players on one device
  hsIamShow:'I’m {name}: show', hsNoReact:'{name} doesn’t respond', hsPass:'Pass the device to: {name}',
  hsLookAway:'Other players, please look away.', hsGiveBack:'Give the device back to: {name}',
  hsSaved:'Your decision has been saved.', hsIam:'I’m {name}',
  turnOf:'Turn: {name}', passDeviceTurn:'Pass the device to this player. Everyone else, don’t look at their cards.',
  iamShowCards:'I’m {name}: show my cards',

  // journal and effects
  logNewGame:'New game: {v}.', variantShort:'classroom version (4 groups or 2 reactions)', variantFull:'full game (6 groups or 3 reactions)',
  logReshuffle:'The discard pile was shuffled into the deck.',
  logDraws:v=>`${v.name} draws ${v.n} ${enCards(v.n)}.`,
  noTarget:'No valid target.',
  logSteal:'{name} steals {el} from {owner}.', logLose:'{name} loses {el}.',
  mustDiscard:v=>`${v.name} must discard ${v.n} ${enCards(v.n)}.`,
  discardN:'Discard a card ({i}/{n})', logDiscards:'{name} discards: {card}.',
  noSuitableDiscard:'There is no suitable card in the discard pile.', logTakesDiscard:'{name} takes from the discard pile: {card}.',
  qStealHandWho:'Who will you take a card from?', nobodyCards:'Nobody has any cards.', logStealHand:'{name} takes a random card from {other}.',
  qStealEl:'Which element will you steal?', qPeekWho:'Whose hand will you look at?', qPeekTake:'{name}’s hand: take 1 card',
  logPeek:'{name} looks at {other}’s cards and takes 1.', logIsElement:'It’s an element: {el}!',
  noElInHand:'No elements in hand.', qWhichElPlay:'Which element will you play?', none:'None',
  discard1:'Discard 1 card', qDestroyEl:'Which element will you destroy?',
  qWhoDisc2:'Who will discard 2 cards?', qWhoDisc1:'Who will discard a card?', mustDiscardCard:'You must discard a card',
  takeModTitle:'Take a Conditions card', qProtect:'Which element will you protect?', logProtected:'{el} is protected until the next turn.',
  takeDiscardTitle:'Take a card from the discard pile', noElDiscard:'There are no elements in the discard pile.', qRevive:'Which element will you bring back?',
  noEquipToDestroy:'There is no equipment to destroy.', qWhoseEquip:'Whose equipment will you destroy?', logEquipDestroyed:'{eq} destroyed ({owner}).',
  takeEquipTitle:'Take equipment from the discard pile', noFreeEl:'You have no free element for equipment.', oppNoEquip:'Your opponents have no equipment.',
  qWhichEquip:'Which equipment will you take?', qOntoWhich:'Onto which of your elements?', logTakesEquip:'{name} takes over {eq}.',
  logPlace:'{name} adds to the lab: <b>{el}</b>.', activation:'activating {sym}',
  logActOk:'Activation successful: {eff}', logActFail:'Activation failed.',
  logEquip:'{name} attaches {eq} to {el}.', logEquipOn:'{name} attaches {eq} to {owner}’s {el}.',
  logSpecial:'{name} plays a special reaction: <b>{card}</b>.', takeCardN:'Take a card ({i}/2)',
  logTop2:'{name} takes 2 cards from the top of the deck.', qOppElTake:'Which opponent’s element will you take?',
  qMyElGive:'Which of your elements will you give away?', logSwap:'{name} swaps {a} for {owner}’s {b}.',
  explosionDiscard:'Explosion! Discard a card', logPassLeft:'Everyone passes a random card to the left.',
  qEquipDestroy:'Which equipment will you destroy?', logCorrode:'{eq} corrodes away ({owner}).',

  // reactions and quiz
  logTry:'{name} tries to carry out a reaction: <b>{r}</b>.', skipTask:'Skip the task', quizTitle:'Balance the equation (+2 to the roll)',
  quizBody:'<p>Reaction scheme for <b>{r}</b>:</p><p class="eqn" style="font-size:16px">{q}</p><p>Choose the correctly balanced equation. Remember: the number of atoms of each element must be the same on both sides of the arrow.</p>',
  logQuizOk:'Equation balanced correctly: +2.', logQuizBad:'Wrong equation. The correct one: {ok}',
  almost:'Almost!', correctIs:'The correct equation is:', rollDiceBtn:'Roll the dice',
  logBotQuiz:'{name} balances the equation correctly: {ok} (+2).',
  logReactOk:'The reaction worked! {name} gains: {reward}', burstReactOk:'Reaction worked!', burstReactRival:'Rival’s reaction',
  logReactBad:'The reaction got out of control! Penalty for {name} ({pen}).', burstFailed:'Failed',
  penDisc1:'Penalty: discard 1 card', penDiscard:'Penalty: discard a card', penWhichEl:'Penalty: which element do you lose?',
  logReactNone:'The reaction didn’t happen, but nothing was lost.',

  // turn and end of game
  logTooMany:'{name} has too many cards (limit 7).', limit7:'7-card limit: discard a card',
  whyReact:v=>`by carrying out ${v.n} ${v.n===1?'reaction':'reactions'}`, whyGroups:'by building a lab with {n} element groups',
  logWins:'{name} wins {why}!', youWin:'You win!', winner:'Winner: {name}',
  reactionsDone:'Reactions carried out', playAgain:'Play again', close:'Close',

  // player clicks
  noTargetTitle:'No target', noTargetCurse:'None of your opponents’ elements has a free equipment slot.',
  noTargetEquip:'First play an element without equipment.', qOnWhose:'On whose element?', qOnWhich:'On which element?',
  cancel:'Cancel', notNow:'Not now', noTargetNow:'This card has no target right now.', logRedraw:'{name} swaps their whole hand for 5 new cards.',

  // new game screen
  seatHuman:'Human', seatBot:'Computer', seatNone:'Empty',
  needTwo:'You need at least 2 players.', needHuman:'You need at least 1 human player.',
  setupIntro:'Set up to 4 seats. Several people can take turns on one device, and the game hides the cards between turns.',
  seat:'Seat {n}', nameLabel:'Name', leaderLabel:'Leader', random:'Random', variant:'Version',
  variantShortBtn:'Classroom · 4 groups / 2 reactions', variantFullBtn:'Full · 6 groups / 3 reactions',
  startGame:'Start game',

  // rules
  rulesTitle:'How to play', letsGo:'Let’s go',
  rulesHtml:`<p>You build a lab out of chemical elements and carry out chemical reactions. Play against computer lab techs or with other people on one device (in “New game”, set seats to Human).</p>
   <h4>Playing with other people</h4><ul><li>At the start of each turn, the game hides the cards and asks you to pass the device on.</li><li>When another player can respond with a Conditions or Peer Review card, the game asks to hand them the device for a moment. They can also click “doesn’t respond” straight away.</li></ul>
   <h4>How to win</h4><ul><li>Collect elements from the required number of different groups in your lab (your leader counts too), or</li><li>carry out the required number of reactions.</li></ul>
   <h4>Your turn: 3 actions</h4><ul>
    <li><b>Draw a card</b> (1). <b>Swap your whole hand</b> for 5 new cards (3).</li>
    <li><b>Play an element</b> (1): put it on the bench and roll 2d6 straight away. A result equal to or higher than its threshold (e.g. 7+) triggers its effect.</li>
    <li><b>Activate</b> an element already on the bench (1, once per turn each).</li>
    <li><b>Attach equipment</b> or <b>use a special reaction</b> (1).</li>
    <li><b>Carry out a reaction</b> (2): you need the required groups. First you can balance the equation: a correct answer gives +2 to the roll.</li></ul>
   <h4>Cards that respond to other players’ moves</h4><ul>
    <li><b>Reaction conditions</b>: after any roll, add or subtract the value shown.</li>
    <li><b>Peer Review!</b>: when a rival plays a card, you both roll 2d6. If you roll higher, their card is lost.</li></ul>
   <h4>Remember</h4><ul><li>Noble gases are inert: they cannot be stolen. Gold does not corrode: it cannot be destroyed.</li><li>At the end of your turn you can hold at most 7 cards.</li></ul>`
};
