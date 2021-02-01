var types = Object.freeze({
  Dnd: 1,
  DndRace: 2,
  DndClass: 3,
  DndItem: 4,
  DndMonster: 5,
  DndSpell: 6,
  DndCurse: 7,
  DndPlace: 8,
  DndMagic: 9,
});

var wordlist = Object.freeze([
  /**
   * SAMPLLE OBJECT
   * 
   * {
   *  en: 'angleški izraz',
   *  slo: [
   *    {
   *      word:  'slovenski izraz 1',
   *      src:   'pobrano iz te knjige',
   *      via:   'ukradel sem ga temu modelu',
   *      rfc?:  'iščejo se alternative'
   *      type?: [
   *        seznam področij, na katerem se uporablja. Lahko se zgodi, da bi se za 
   *        d&d uporabljale drugačne besede, kot bi bilo možno drugače. Prazen, če
   *        nima nobenega posebnega tipa. Če beseda nima nobenega tipa se šteje, 
   *        kot da ima vse tipe.
   *      ],
   *      usage: [
   *        kje se ta beseda uporablja
   *      ],
   *      note?: 'opomba'
   *    }
   *      : 
   *      :   (ponovi vajo, kolikokrat rabiš)
   *      : 
   *  ]
   *
   * }
   */

  /**
   * Races (general)
   */
  //#region 
  {
    en: 'goblin',
    slo: [
      {word: 'goblin', usage: [ 'Pošasti', 'Rase' ]},
      {word: 'grdin', wordExtras: [{type: 'ž.', word: 'grdinka'}], src: 'Hobbit', usage: [ 'Pošasti', 'Rase' ]}
    ],
  }, {
    en: 'orc', 
    slo: [
      {word: 'ork', usage: ['Pošasti', 'Rase'], note: 'Nima posebne oblike za ženski spol.'}
    ]
  }, {
    en: 'ork', 
    slo: [
      {word: 'ork', usage: ['Pošasti', 'Rase'], note: 'Nima posebne oblike za ženski spol. Pa tko ob potki, W40k to narobe piše.'}
    ]
  }, {
    en: 'elf',
    slo: [
      {word: 'vilin', wordExtras: [{type: 'ž.', word: 'vilinka'}], usage: ['Rase'], note: 'Kot videno v Tolkienovih delih, D&D ter vsaki računalniški igri, ki je obstajala.'},
      {word: 'vilinec', wordExtras: [{type: 'ž.', word: 'vilinčevka'}], usage: ['Rase'], note: 'Vilin je boljši prevod.'},
    ]
  }, {
    en: 'dwarf',
    slo: [
      {word: 'škrat', wordExtras: [{type: 'ž.', word: 'škratinja'}], usage: ['Rase'], note: 'Kot videno v Tolkienovih delih, D&D ter vsaki računalniški igri, ki je obstajala.'}
    ]
  }, {
    en: 'gnome', 
    slo: [
      {word: 'palček', wordExtras: [{type: 'ž.', word: 'palčica'}], usage: ['Rase']}
    ]
  },
  //#endregion
  /**
   * ***********************************
   *   5e RACES
   * ***********************************
   */
  //#region 
  {
    en: 'dragonborn',
    slo: [
      {word: 'zmajeroden', wordExtras: [{type: 'ž.', word: 'zmajerodna'}], usage: ['D&D/rase'], type: [types.Dnd, types.DndRace], note: '"Dragonborn" je v angleščini množinski samostalnik, zato je prvi prevod tudi v množini.'},
      {word: 'zmajerodni', usage: ['D&D/rase'], type: [types.Dnd, types.DndRace], note: '"Dragonborn" je v angleščini množinski samostalnik, zato je prvi prevod tudi v množini.'},
      {word: 'zmajik', via: 'Sneikss', usage: ['D&D/rase'], type: [types.Dnd, types.DndRace]},
    ],
  }, {
    en: 'lizardfolk',
    slo: [
      {word: 'luskin', wordExtras: [{type: 'ž.', word: 'luskinka'}], via: 'Sneikss', type: [types.Dnd, types.DndRace]},
      {word: 'luskini', via: 'Sneikss', type: [types.Dnd, types.DndRace]}
    ]
  }, {
    en: 'drow',
    slo: [
      {word: 'temin', wordExtras: [{type: 'ž.', word: 'teminka'}], via: 'Sneikss', usage: ['D&D/rase'], type: [types.Dnd, types.DndRace]},
      {word: 'temni vilin', wordExtras: [{type: 'ž.', word: 'temna vilinka'}], usage: ['D&D/rase'], type: [types.Dnd, types.DndRace]},
      {word: 'podmračnik', wordExtras: [{type: 'ž.', word: 'podmračnica'}], via: 'Sneikss', usage: ['D&D/rase'], type: [types.Dnd, types.DndRace], note: 'Rajši se uporablja "temin" oz. "temni vilin" — razen v primeru, da se govori o njihovem izvoru.'},
      {word: 'podbrodar', wordExtras: [{type: 'ž.', word: 'podbrodarka'}], usage: ['D&D/rase'], type: [types.Dnd, types.DndRace], note: 'Rajši se uporablja "temin" oz. "temni vilin" — razen v primeru, da se govori o njihovem izvoru.'},
    ]
  }, {
    en: 'warforged',
    slo: [
      {word: 'železnik', usage: ['D&D/rase'], type: [types.Dnd, types.DndRace]}
    ]
  },
  //#endregion
  /**
   * ***********************************
   * 5e CLASSES
   * ***********************************
   */
  //#region
  {
    en: 'artificer',
    slo: [
      {word: 'znajdbar', wordExtras: [{type: 'ž.', word: 'znajdbarka'}], via: 'Sneikss', rfc: true, usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]}
    ]
  }, {
    en: 'barbarian',
    slo: [
      {word: 'barbar', wordExtras: [{type: 'ž.', word: 'barbarka'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]}
    ]
  }, {
    en: 'fighter', 
    slo: [
      {word: 'borec', wordExtras: [{type: 'ž.', word: 'borka'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]}
    ]
  }, {
    en: 'bard',
    slo: [
      {word: 'godec', wordExtras: [{type: 'ž.', word: 'pevka'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]},
      {word: 'vsejebač', usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], note: 'Ok to je šala, nekdo je preveč /r/dndmemes gledal.'}
    ]
  }, {
    en: 'cleric',
    slo: [
      {word: 'svečenik', wordExtras: [{type: 'ž.', word: 'svečenica'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], via: 'Sneikss'}
    ]
  }, {
    en: 'rogue',
    slo: [
      {word: 'zmikavt', wordExtras: [{type: 'ž.', word: 'zmikavtinja'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], via: 'Sneikss'},
    ]
  }, {
    en: 'rouge',
    slo: [
      {word: 'zmikavt', wordExtras: [{type: 'ž.', word: 'zmikavtinja'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], via: 'Sneikss', note: 'Pa po angleško se pravilno reče \'rogue\', prosim hvala.'},
    ]
  }, {
    en: 'monk',
    slo: [
      {word: 'menih', wordExtras: [{type: 'ž.', word: 'redovnica'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], note: 'Določanje ženske oblike je smešno, tako da se tudi za ženske lahko uporablja tudi moška oblika (menih).'},
    ]
  }, {
    en: 'wizard',
    slo: [
      {word: 'čarovnik', wordExtras: [{type: 'ž.', word: 'čarovnica'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]}
    ]
  }, {
    en: 'sorcerer',
    slo: [
      {word: 'čarodej', wordExtras: [{type: 'ž.', word: 'čarodejka'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass]}
    ]
  }, {
    en: 'warlock',
    slo: [
      {word: 'coprnik', wordExtras: [{type: 'ž.', word: 'coprnica'}], usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], via: 'Sneikss'},
      {word: 'vešč', usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], via: 'Sneikss'},
    ]
  }, {
    en: 'druid',
    slo: [
      {word: 'druid', usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], note: 'Nima posebne oblike za ženski spol.'}
    ]
  }, {
    en: 'paladin',
    slo: [
      {word: 'paladin', usage: ['D&D/razredi'], type: [types.Dnd, types.DndClass], note: 'Prevajanje tega izraza je bojda haram.'}
    ]
  },
  //#endregion
  /**
   * ***********************************
   *   5e ITEMS & misc stuff
   * ***********************************
   */
  //#region
    {
    en: 'driftglobe', 
    slo: [
      {word: 'drskugla', usage: ['D&D/predmeti'], type: [types.Dnd, types.DndItem]},
      {word: 'drskrogla', usage: ['D&D/predmeti'], type: [types.Dnd, types.DndItem]}
    ]
  }, {
    en: 'bag of holding',
    slo: [
      {word: 'žakelj hrambe', usage: ['D&D/predmeti'], type: [types.Dnd, types.DndItem], via: 'Sneikss'}
    ]
  }, {
    en: 'deck of many things',
    slo: [
      {word: 'kupček mnogočesa', usage: ['D&D/predmeti'], type: [types.Dnd, types.DndItem], via: 'Sneikss' }
    ]
  }, {
    en: 'three-dragon ante',
    slo: [
      {word: 'trozmajski zastavek', rfc: true, usage: ['D&D/igre'], type: [types.Dnd]}
    ]
  }, {
    en: 'spell scroll',
    slo: [
      {word: 'uročni zvitek', usage: ['D&D/predmeti']}
    ]
  }, {
    en: 'robe',
    slo: [
      {word: 'talar', usage: ['Predmeti']}
    ]
  }, {
    en: 'robes',
    slo: [
      {word: 'talar', usage: ['Predmeti']}
    ]
  }, {
    en: 'Lightning rail',
    slo: [
      {word: 'strelopot', usage: ['Predmeti'], types: [types.Dnd, types.DndItem]}
    ]
  },
  //#endregion
  /**
   * ***********************************
   *    MAGIC & SPELLS (5e)
   * (ter ostalo čarovniško izrazoslovje)
   * ***********************************
   */
  //#region
  {
    en: 'abjuration',
    slo: [
      {word: 'preklic', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'conjuration',
    slo: [
      {word: 'priklic', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'divination',
    slo: [
      {word: 'videnje', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'enchantment',
    slo: [
      {word: 'zarek', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'evocation',
    slo: [
      {word: 'dramilo', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'illusion',
    slo: [
      {word: 'privid', usage: ['D&D/čarovništvo']}
    ]
  }, {
    en: 'necromancy',
    slo: [
      {word: 'mrtvokletev', rfc: true, usage: ['D&D/čarovništvo']},
      {word: 'mrtvočar', rfc: true, usage: ['D&D/čarovništvo']}
    ]
  }, {
    en: 'transmutation',
    slo: [
      {word: 'pretvorba', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    en: 'spell',
    slo: [
      {word: 'urok', usage: ['D&D/čarovništvo']}
    ]
  }, {
    en: 'cantrip',
    slo: [
      {word: 'čar', rfc: true, usage: ['D&D/čarovništvo'], via: 'Sneikss'}
    ]
  }, {
    // ———————— [ Uroki ] ——————————
    en: 'fireball',
    slo: [
      {word: 'ognjekugla', usage: ['D&D/čarovništvo', 'Uroki']},
      {word: 'ognjekrogla', usage: ['D&D/čarovništvo', 'Uroki']},
    ]
  }, {
    en: 'firebolt',
    slo: [
      {word: 'ognjeblisk', usage: ['D&D/čarovništvo', 'Uroki']}
    ]
  }, {
    en: 'shocking grasp',
    slo: [
      {word: 'stresobjem', usage: ['D&D/čarovništvo', 'Uroki']}
    ]
  }, {
    en: 'sleep',
    slo: [
      {word: 'spanec', usage: ['D&D/čarovništvo', 'Uroki']}
    ]
  }, {
    en: 'goodberry',
    slo: [
      {word: 'dobrogrozd', usage: ['D&D/čarovništvo', 'Uroki']}
    ]
  }, {
    en: 'plane',
    slo: [
      {word: 'ravan', usage: ['D&D/čarovništvo'], types: [types.Dnd, types.DndMonster], via: 'Sneikss'},
      {word: 'plan', usage: ['D&D/čarovništvo'], types: [types.Dnd, types.DndMonster], via: 'Sneikss'}
    ]
  },
  //#endregion
  /**
   * ***********************************
   *    5e places
   * ***********************************
   */
  //#region
  {
    en: 'Underark',
    slo: [
      {word: 'Podmračje', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace], via: 'Sneikss'},
    ]
  }, {
    en: 'Feywild',
    slo: [
    {word: 'Vselesje', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace], via: 'Sneikss'},
    {word: 'Vilje', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace] },
    ]
  }, {
    en: 'The 9 Hells',
    slo: [
      {word: 'Devet peklov', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace], via: 'Sneikss'},
    ]
  }, {
    en: 'The Abyss',
    slo: [
      {word: 'Brezno', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace], via: 'Sneikss', notes: 'Ne škodi, če se namesto tega reče brezlo.'},
    ]
  }, {
    en: 'Astral Sea',
    slo: [
      {word: 'Zvezdno morje', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace]},
      {word: 'Zvezno morje', usage: ['D&D/mesta'], type: [types.DnD, types.DndPlace], notes: 'Izvirno tipkarska napaka imena <i>‘zvezno morje’</i>, vendar pa se je v določenih krogih obdržalo to poimenovanje.'},
    ]
  },
  //#endregion
  /**
   * ***********************************
   *    MONSTERS & CREATRURES
   * ***********************************
   */
  //#region 
  //#region ———————— [ Drakonidi ] ———————————
  {
    en: 'dragon',
    slo: [
      {word: 'zmaj', wordExtras: [{type: 'ž.', word: 'zmajevka'}], usage: ['Bitja', 'Drakonidi']}
    ]
  }, {
    en: 'hatchling',
    slo: [
      {word: 'izleženček', usage: ['Bitja', 'Živali', 'Drakonidi'], note: 'Nima posebne oblike za ženski spol (kot dete/dojenček).'}
    ]
  }, {
    en: 'wyvern',
    slo: [
      {word: 'gadjerep', rfc: true, usage: ['Pošasti', 'Bitja', 'Drakonidi'], note: 'Nima posebne oblike za ženski spol. Gadjerepi niso zmaji. Kot izraz, ki zajema tako zmaje kot gadjerepe in ostale ne-zmaje obstaja beseda \'draconid\' (oz. \'drakonid\' po naše).'},
      {word: 'gadjek', rfc: true, usage: ['Pošasti', 'Bitja', 'Drakonidi'], note: '"Gadjerep" je verjetno bojša možnost.'}
    ],
  }, {
    en: 'drake',
    slo: [
      {word: 'zmij', src: 'Hobbit', usage: ['Bitja', 'Drakonidi'], note: 'Nima posebne oblike za ženski spol. V D&D se z \'drake\' sem ter tja označuje stvari, ki to niso (zmiji imajo štiri noge in so brez kril).'}
    ]
  }, {
    en: 'serpent',
    slo: [
      {word: 'kač', usage: ['Bitja', 'Drakonidi'], note: 'Nima posebne oblike za ženski spol. Prevajalci Tolkiena so besedo \'kač\' uporabili kot prevod za \'wyrm\'. Ta slovarček jo uporablja za oboje.'}
    ]
  }, {
    en: 'wyrm',
    slo: [
      {word: 'kač', src: 'Hobit', usage: ['Bitja', 'Drakonidi'], note: 'Nima posebne oblike za ženski spol. Tudi besedo \'serpent\' se prevaja kot kač. Zaenkrat.'}
    ]
  }, {
    en: 'cockatrice',
    slo: [
      {word: 'luskura', usage: ['Pošasti', 'Bitja', 'Drakonidi'], note: 'Nima posebne oblike za moški spol.'}
    ]
  },
  //#endregion
  //#region ———————— [ Zveri ] ———————————————
  {
    en: 'direwolf',
    slo: [
      { word: 'pravolk', wordExtras: [{type: 'ž.', word: 'pravolkulja'}] usage: ['Bitja', 'Zveri'], via: 'Sneikss'},
      { word: 'zlolk', wordExtras: [{type: 'ž.', word: 'zlolkulja'}], rfc: true, usage: ['Bitja', 'Zveri'], note: 'Etimološko: <i>zlo</i> + <i>volk</i>, beri: <i>\'zlovk\'</i>. Sprejemljiva je tudi daljša oblika <i>\'zlovolk</i>\', ampak ne pretiravati.'},
      { word: 'krvovolk',usage: ['Bitja', 'Zveri'], via: 'Igra prestolov?', note: 'Moj google-fu ne najde drugih instanc. Za resničnosveško različico tega bitja na slovenski wikipediji in prosto-dostopnih slovarjih slovenskega jezika ni. Je pa to zelo skremžljiv prevod, tako da prosim ne.'},
    ]
  },
  //#endregion
  //#region ———————— [ Raznodlaki ] ——————————
  {
    en: 'lycanthrope',
    slo: [
      { word: 'raznodlak', wordExtras: [{type: 'ž.', word: 'raznodlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki', 'D&D'], type: [types.Dnd, types.DndMonster], note: '"Lyncanthrope" v angleščini sicer pomeni volkodlak, vendar pa se za nadskupino volkodlakov (ki vključuje tudi medvedodlake, tigrodlake, svinjedlake itd.) beseda \'raznodlak\' zdi bolj primerna. Manj fancy angleška beseda je "werebeast." Kot pravilo palca se imena raznodlakov iz angleščine prevaja tako: were[something] -> [nekej]dlak.'},
      { word: 'volkodlak', wordExtras: [{type: 'ž.', word: 'volkodlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], note: 'Samo za primere, ko se "lyncanthrope" uporablja zgolj za volkodlake in ne tudi za sorodne stvari (npr. medvedodlake, tigrodlake, svinjedlake).'}
    ]
  }, {
    en: 'lycanthropes',
    slo: [
      { word: 'raznodlaki', wordExtras: [{type: 'ž.', word: 'raznodlakinje'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki', 'D&D'], type: [types.Dnd, types.DndMonster], note: '"Lyncanthrope" v angleščini sicer pomeni volkodlak, vendar pa se za nadskupino volkodlakov (ki vključuje tudi medvedodlake, tigrodlake, svinjedlake itd.) beseda \'raznodlak\' zdi bolj primerna. Manj fancy angleška beseda je "werebeasts."  Kot pravilo palca se imena raznodlakov iz angleščine prevaja tako: were[something] -> [nekej]dlak.'},
      { word: 'volkodlaki', wordExtras: [{type: 'ž.', word: 'volkodlakinje'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], note: 'Samo za primere, ko se "lyncanthrope" uporablja zgolj za volkodlake in ne tudi za sorodne stvari (npr. medvedodlake, tigrodlake, svinjedlake).'}
    ]
  }, {
    en: 'lycanthropy',
    slo: [
      {word: 'raznodlaštvo',  usage: ['Prekletstva'], type: [types.Dnd, types.DndMonster, types.DndSpell, types.DndCurse], note: "Prekletstvo, zaradi katerih so raznodlaki raznodlaki."},
      {word: 'volkodšatvo',  usage: ['Prekletstva'], note: '"Prekletstvo, zaradi katerih so volkodlaki volkodlaki. Samo za primere, ko se "lyncanthropy" uporablja zgolj za volkodlaštvo in ne tudi za sorodne stvari (npr. medvedodlake, tigrodlake, svinjedlake)."'}
    ]
  }, {
    en: 'werewolf',
    slo: [
      {word: 'volkodlak', wordExtras: [{type: 'ž.', word: 'volkodlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki']}
    ]
  }, {
    en: 'werebear',
    slo: [
      {word: 'medvedodlak', wordExtras: [{type: 'ž.', word: 'medvedodlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'wererat',
    slo: [
      {word: 'podganjedlak', wordExtras: [{type: 'ž.', word: 'podganjedlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'weretiger',
    slo: [
      {word: 'tigrodlak', wordExtras: [{type: 'ž.', word: 'tigrodlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'wereboar',
    slo: [
      {word: 'svinjedlak', wordExtras: [{type: 'ž.', word: 'svinjedlakinja'}], usage: ['Pošasti', 'Bitja', 'Raznodlaki'], type: [types.Dnd, types.DndMonster]}
    ]
  },
  //#endregion
  //#region ———————— [ Velikani ] ————————————
  {
    en: 'stone giant',
    slo: [
      {word: 'ajd', src: 'Hobbit', usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster], note: 'Nima posebne oblike za ženski spol. Bojda so v Hobitu "stone giants" prevedli kot ajdi'}
    ]
  }, {
    en: 'cloud giant',
    slo: [
      {word: 'oblačnik', wordExtras: [{type: 'ž.', word: 'oblačnica'}], usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'frost giant',
    slo: [
      {word: 'lednik', wordExtras: [{type: 'ž.', word: 'lednica'}], usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'fire giant',
    slo: [
      {word: 'ognjevnik', wordExtras: [{type: 'ž.', word: 'ognjevnica'}], rfc: true,  usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'storm giant',
    slo: [
      {word: 'nevihtnik', wordExtras: [{type: 'ž.', word: 'nevihtnica'}], usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster]}
    ]
  }, {
    en: 'hill giant', 
    slo: [
      {word: 'hribovnik', wordExtras: [{type: 'ž.', word: 'hribovnica'}], usage: ['Bitja', 'Velikani'], type: [types.Dnd, types.DndMonster]}
    ]
  },
  //#endregion
  //#region ———————— [ Razno ] ———————————————
  {
    en: 'mind flayer',
    slo: [
      {word: 'umovor', usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster], via: 'Sneikss', note: 'Nima posebne oblike za ženski spol.'}
    ],
  }, {
    en: 'beholder',
    slo: [
      {word: 'motrivec', wordExtras: [{type: 'ž.', word: 'motrivka'}], usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'},
      {word: 'buljež', usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster], via: 'Sneikss', note: 'Nima posebne oblike za ženski spol.'},
      {word: 'očividec', wordExtras: [{type: 'ž.', word: 'očividka'}], usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'}
    ],
  }, {
    en: 'lich', 
    slo: [
      {word: 'gnoba', usage: ['Pošasti', 'Bitja'] },
      {word: 'gnor', rfc: true, usage: ['Pošasti', 'Bitja'], note: 'Priporočeno gnoba?', via: 'Sneikss'},
    ]
  }, {
    en: 'dracolich', 
    slo: [
      {word: 'zmijegnoba', usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster] },
      {word: 'zmijegnor', rfc: true, usage: ['Pošasti', 'Bitja'], type: [types.Dnd, types.DndMonster], note: 'Priporočeno *gnoba?', via: 'Sneikss'},
    ]
  }, {
    en: 'archlich', 
    slo: [
      {word: 'pragnoba', usage: ['Pošasti', 'Bitja'] },
      {word: 'pragnor', rfc: true, usage: ['Pošasti', 'Bitja'], note: 'Priporočeno gnoba?', via: 'Sneikss'},
    ]
  }, {
    en: 'celestial',
    slo: [
      {word: 'nebesnik', wordExtras: [{type: 'ž.', word: 'nebesnica'}], usage: ['Bitja'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'}
    ]
  }, {
    en: 'fey',
    slo: [
      {word: 'vilec', wordExtras: [{type: 'ž', word: 'vilčevka'}, {type: 'množ.', word: 'vilci'}], usage: ['Bitja']},
    ]
  }, {
    en: 'fairy',
    slo: [
      {word: 'vila', usage: ['Bitja'], note: 'Nima posebne oblike za moški spol.'}
    ]
  }, {
    en: 'faery',
    slo: [
      {word: 'vila', usage: ['Bitja'], note: 'Nima posebne oblike za moški spol.'}
    ]
  }, {
    en: 'wraith',
    slo: [
      {word: 'bes', usage: ['Pošasti']}
    ]
  }, {
    en: 'fiend', 
    slo: [
      {word: 'nestvor', usage: ['Pošasti'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'},
      {word: 'mrznik', usage: ['Pošasti'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'},
      {word: 'črt', usage: ['Pošasti'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'},
    ]
  }, {
    en: 'aberration',
    slo: [
      {word: 'nakazen', usage: ['Pošasti'], type: [types.Dnd, types.DndMonster], via: 'Sneikss'}
    ]
  }, {
    en: 'elemental',
    slo: [
      {word: 'prvinec', usage: ['Pošasti'], types: [types.Dnd, types.DndMonster], notes: 'Prvinci so načeloma brezspolna bitja, tako da ženske oblike ni.'},
      {word: 'prvinski', usage: ['Pošasti'], types: [types.Dnd, types.DndMonster]},
    ]
  },
  //#endregion razno
  //#endregion
  /**
   * ***********************************
   *   Orožja
   * ***********************************
   */
  //#region 
  {
    en: 'javelin',
    slo: [
      {word: 'kopje', usage: ['Orožja']}
    ]
  }, {
    en: 'spear',
    slo: [
      {word: 'sulica', usage: ['Orožja']},
    ]
  }, {
    en: 'lance',
    slo: [
      {word: 'konjeniška sulica', usage: ['Orožja']}
    ]
  }, {
    en: 'trident',
    slo: [
      {word: 'trizob', usage: ['Orožja']},
      {word: 'runka', usage: ['Orožja'], note: 'Trizob, ampak nemški'},
      {word: 'korzeka', usage: ['Orožja'], note: 'Trizob, ampak narejen iz špagetov (italjanski)'},
    ]
  }, {
    en: 'pike',
    slo: [
      {word: 'dolga sulica', usage: ['Orožja']},
      {word: 'špis', usage: ['Orožja'], note: 'Sposojeno iz nemščine (ko prevod v bistvu ni prevod).'},
    ]
  }, {
    en: 'shortsword',
    slo: [
      {word: 'meč', usage: ['Orožja']},
      {word: 'kratek meč', usage: ['Orožja']}
    ]
  }, {
    en: 'longsword',
    slo: [
      {word: 'meč', usage: ['Orožja']}
    ]
  }, {
    en: 'greatsword',
    slo: [
      {word: 'dvoročnik', usage: ['Orožja']}
    ]
  }, {
    en: 'scimitar',
    slo: [
      {word: 'sablja', usage: ['Orožja']},
      {word: 'zakrivljenec', usage: ['Orožja'], note: 'Če komu beseda "sablja" iz kateregakoli razloga ne diši, ker ni vsaka sablja "schimitar"'},
    ]
  }, {
    en: 'sling',
    slo: [
      {word: 'prača', usage: ['Orožja']}
    ]
  }, {
    en: 'glaive',
    slo: [
      {word: 'glefa', usage: ['Orožja'], notes: 'Če imaš v svojem D&D svetu kakšnega kekca, ki rad poimenuje svoja orožja, je \'Lukas\' tako zelo lepo, primerno ime.'}
    ]
  }, {
    en: 'club',
    slo: [
      {word: 'gorjača', usage: ['Orožja']}
    ]
  }, {
    en: 'staff',
    slo: [
      {word: 'palica', usage: ['Orožja']}
    ]
  }, {
    en: 'quarterstaff',
    slo: [
      {word: 'četrt-palica', usage: ['Orožja'], note: 'Slovaška wikipedija legit uporablja ta izraz'}
    ]
  }, {
    en: 'sickle',
    slo: [
      {word: 'srp', usage: ['Orožja']}
    ]
  }, {
    en: 'rapier',
    slo: [
      {word: 'rapir', usage: ['Orožja']}
    ]
  }, {
    en: 'halberd',
    slo: [
      {word: 'helebarda', usage: ['Orožja']}
    ]
  }, {
    en: 'trebuchet',
    slo: [
      {word: 'tribok', usage: ['Orožja'], note: 'Daleč najboljše oblegovalno orožje. Nikdar ne reči temu katapult, ker lahko sprožiš ljudi do te mere, se reeeeeee-janje sliši tudi do 20 kilometrov daleč, preko ene petih hribov.'}
    ]
  }, {
    en: 'morningstar',
    slo: [
      {word: 'buzdovan', usage: ['Orožja']}
    ]
  }, {
    en: 'morning star',
    slo: [
      {word: 'buzdovan', usage: ['Orožja']}
    ]
  }, {
    en: 'maul',
    slo: [
      {word: 'kladivo', usage: ['Orožja']}
    ]
  }, {
    en: 'hammer',
    slo: [
      {word: 'kladivo', usage: ['Orodja', 'Orožja']}
    ]
  }, {
    en: 'light hammer',
    slo: [
      {word: 'lahko kladivo', usage: ['Orožja']}
    ]
  }, {
    en: 'war hammer', 
    slo: [
      {word: 'bojno kladivo', usage: ['Orožja']}
    ]
  }, {
    en: 'warhammer', 
    slo: [
      {word: 'bojno kladivo', usage: ['Orožja']}
    ]
  }, {
    en: 'axe', 
    slo: [
      {word: 'sekira', usage: ['Orožja']}
    ]
  }, {
    en: 'hand axe', 
    slo: [
      {word: 'sekira', usage: ['Orožja']},
      {word: 'ročna', usage: ['Orožja']},
    ]
  }, {
    en: 'battleaxe',
    slo: [
      {word: 'bojna sekira', usage: ['Orožja']}
    ]
  }, {
    en: 'battle axe',
    slo: [
      {word: 'bojna sekira', usage: ['Orožja']}
    ]
  }, {
    en: 'greataxe',
    slo: [
      {word: 'velika sekira', usage: ['Orožja']}
    ]
  }, {
    en: 'dagger',
    slo: [
      {word: 'bodalo', usage: ['Orožja']}
    ]
  }, {
    en: 'knife',
    slo: [
      {word: 'nož', usage: ['Orodja', 'Orožja']}
    ]
  }, {
    en: 'flail',
    slo: [
      {word: 'bojni mlat', usage: ['Orožja']},
      {word: 'cepec', usage: ['Orodja']}
    ]
  }, {
    en: 'mace',
    slo: [
      {word: 'bojni kij', usage: ['Orožja']}
    ]
  }, {
    en: 'warpick', 
    slo: [
      {word: 'bojni kljun', usage: ['Orožja']}
    ]
  }, {
    en: 'war pick', 
    slo: [
      {word: 'bojni kljun', usage: ['Orožja']}
    ]
  }, {
    en: 'blowgun',
    slo: [
      {word: 'pihalnik', usage: ['Orožja']}
    ]
  }, {
    en: 'dart',
    slo: [
      {word: 'želo', usage: ['Orožja'], via: 'Sneikss'},
      {word: 'puščica', usage: ['Orožja']},
    ]
  }, {
    en: 'arrow',
    slo: [
      {word: 'puščica', usage: ['Orožja']}
    ]
  }, {
    en: 'bolt',
    slo: [
      {word: 'strelica', usage: ['Orožja'], via: 'Sneikss'},
      {word: 'puščica', usage: ['Orožja']},
    ]
  }, {
    en: 'bow',
    slo: [
      {word: 'lok', usage: ['Orožja']},
      {word: 'premec', usage: ['Ladje']},
      {word: 'kljun', usage: ['Ladje']},
    ]
  }, {
    en: 'shortbow',
    slo: [
      {word: 'lok', usage: ['Orožja']},
      {word: 'kratki lok', usage: ['Orožja']},
    ]
  }, {
    en: 'longbow', 
    slo: [
      {word: 'dolgi lok', usage: ['Orožja']}
    ]
  }, {
    en: 'crossbow',
    slo: [
      {word: 'samostrel', usage: ['Orožja']}
    ]
  }, {
    en: 'hand crossbow',
    slo: [
      {word: 'ročni samostrel', usage: ['Orožja']}
    ]
  }, {
    en: 'light crossbow', 
    slo: [
      {word: 'lahki samostrel', usage: ['Orožja']}
    ]
  }, {
    en: 'heavy crossbow',
    slo: [
      {word: 'težki samostrel', usage: ['Orožja']}
    ]
  }, {
    en: 'whip',
    slo: [
      {word: 'bič', usage: ['Orožja']}
    ]
  }, {
    en: 'sickle',
    slo: [
      {word: 'srp', usage: ['Orodja', 'Orožja']}
    ]
  }, {
    en: 'scythe',
    slo: [
      {word: 'kosa', usage: ['Orodja', 'Orožja']}
    ]
  },
  //#endregion
  /**
   * ***********************************
   *   Misc
   * ***********************************
   */
  //#region 
  {
    en: 'homebrew',
    slo: [
      {word: 'žganjekuha', usage: [ 'Igre/meta']}
    ],
  }, {
    en: 'eldritch',
    slo: [
      {word: 'nečuven', usage: ['D&D/uroki'], via: 'Sneikss'}
    ]
  }, {
    en: 'npc',
    slo: [
      {word: 'neigranec', usage: ['Igre/meta'], via: 'Sneikss'},
      {word: 'Neigrana oseba', usage: ['Igre/meta']},
      {word: 'NIO (Neigrana oseba)', usage: ['Igre/meta']}
    ]
  }, {
    en: 'worldbuilding',
    slo: [
      {word: 'svetogradnja', usage: ['Igre/meta']}
    ]
  }
]);


var Dictionary = {
  types: types,
  wordlist: wordlist,
}

export default Dictionary;
