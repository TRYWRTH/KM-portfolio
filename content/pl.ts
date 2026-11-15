// All Polish copy for the site lives here. To add English later, create
// content/en.ts with the same shape (`Content`) and pick one by locale.

export type SectionId = "about" | "work" | "czsz" | "contact";

export type Side = "l" | "r";

export interface Section {
  id: SectionId;
  /** URL path, without the leading slash */
  slug: string;
  label: string;
  /** shown in the top-right corner of the hero instead of the bottom row */
  topBar?: true;
  /** words dropped from the label on narrow screens (< 768px), e.g. "Kolektyw" */
  mobileHide?: string;
  /** photo shown blurred, behind tinted glass, as the page background */
  bg: string;
  /** side the link lives on = side the curtain wipes in from */
  side: Side;
}

export const pl = {
  lang: "pl",
  name: "Karolina Maciejaszek",
  shortName: "K. Maciejaszek",
  // shown under the name during the opening only
  roles: ["Reżyserka", "Performerka", "Wykładowczyni"],
  photoAlt: "Karolina Maciejaszek",
  meta: {
    title: "Karolina Maciejaszek — reżyserka, performerka, wykładowczyni",
    description:
      "Karolina Maciejaszek — reżyserka teatralna, performerka i wykładowczyni. Teatr formy łączący elementy teatru dramatycznego i plastycznego.",
  },
  nav: {
    main: "Główna nawigacja",
  },
  placeholder: "W przygotowaniu.",
  // The four sections, in order. Order = the hero navigation (Kontakt sits top right),
  // the tabs inside an open page, and the 01–04 numbering on the kickers.
  sections: [
    // bio + timeline (education, Kalendarium) + teaching at the Akademia
    { id: "about", slug: "o-mnie", label: "O mnie", bg: "/karolina.jpg", side: "l" },
    // her main work
    { id: "work", slug: "rezyseria", label: "Reżyseria", bg: "/photos/orlice.jpg", side: "l" },
    { id: "czsz", slug: "czarne-szmaty", label: "Performance", bg: "/photos/granica-pogardy.jpg", side: "l" },
    { id: "contact", slug: "kontakt", label: "Kontakt", bg: "/photos/ulanskie-fantazje.jpg", side: "r", topBar: true },
  ] satisfies Section[],
};

// O mnie: two columns. Left: title + collapsible sections; right: bio + selected awards.
export interface AboutEntry {
  label?: string;
  title: string;
  description?: string;
}

export const about = {
  title: "Reżyserka, performerka, wykładowczyni",
  sections: [
    {
      title: "Wykształcenie",
      entries: [
        { label: "2002–2008", title: "Akademia Teatralna im. Aleksandra Zelwerowicza w Warszawie", description: "Reżyseria" },
        { label: "1998–2003", title: "Uniwersytet Jagielloński w Krakowie", description: "Teatrologia" },
      ] as AboutEntry[],
    },
    {
      title: "Kariera",
      entries: [
        { label: "2007–obecnie", title: "Reżyseria teatralna", description: "Realizacje w teatrach dramatycznych i lalkowych" },
        { label: "2016–obecnie", title: "Performerka w kolektywie Czarne Szmaty", description: "Współzałożycielka i członkini kolektywu akcjonistycznego" },
      ] as AboutEntry[],
    },
    {
      title: "Praca dydaktyczna",
      entries: [
        {
          title: "Akademia Sztuk Teatralnych w Krakowie, Filia we Wrocławiu",
          description: "Wykładowczyni na Wydziale Lalkarskim, w latach 2020–2024 prodziekanka d.s. reżyserii Wydziału Lalkarskiego",
        },
      ] as AboutEntry[],
      coursesLabel: "Zajęcia",
      courses: [
        { title: "Propedeutyka reżyserii", description: "kierunek: reżyseria" },
        { title: "Czytanie performatywne", description: "kierunek: reżyseria" },
        { title: "Reżyseria teatru formy", description: "kierunek: reżyseria" },
        { title: "Sceny współczesne", description: "kierunek: aktorstwo teatru lalek oraz reżyseria" },
      ] as AboutEntry[],
    },
  ],
  lead: "Absolwentka reżyserii na Akademii Teatralnej im. Aleksandra Zelwerowicza w Warszawie oraz teatrologii na Uniwersytecie Jagiellońskim w Krakowie. Debiutowała w 2007 roku spektaklem „Woyzeck” w Teatrze im. Jaracza w Olsztynie.",
  paragraphs: [
    "Pracuje w teatrach dramatycznych i lalkowych, instytucjonalnych i offowych. W ostatnich latach aktywnie działa w teatrze formy: łączącym elementy teatru dramatycznego i teatru plastycznego.",
    "Współzałożycielka i członkini kolektywu akcjonistycznego „Czarne Szmaty”. Wykładowczyni w Akademii Sztuk Teatralnych w Krakowie, Filii we Wrocławiu, w latach 2020–2024 Prodziekanka d.s. reżyserii na w/w uczelni.",
  ],
};

// Kontakt
// The e-mail address and phone number are stored reversed and only put together in the browser
// when someone clicks, so they never appear in the page's HTML (keeps address-harvesting bots away).
// To change them, write the new value backwards here (e.g. "gmail.com" -> "moc.liamg").
export const contact = {
  title: "Kontakt",
  email: {
    label: "mail",
    action: "Napisz e-mail",
    copy: "kopiuj adres",
    copied: "skopiowano",
    user: "kezsajeicam.anilorak",
    domain: "moc.liamg",
  },
  phone: {
    label: "tel.",
    action: "Zadzwoń",
    country: "+48",
    digits: "003092606",
  },
};

// Kolektyw Czarne Szmaty
export const collective = {
  title: "Czarne Szmaty",
  // paragraphs[0] is the lead on the page
  paragraphs: [
    "Kolektyw akcjonistyczny Czarne Szmaty założony w 2016 (wspólnie z Martą Jalowską i Magdaleną Staroszczyk) działa w obrębie szeroko pojętej sztuki performatywnej – performensu, street artu, happeningu – używając do nawiązania dialogu społecznego różnych mediów.",
    "Odpowiadając na nowe modele komunikacji, konfrontacyjny aspekt działań Czarnych Szmat przyjmuje różne formy, od bezpośredniej konfrontacji w przestrzeni miejskiej do publikacji w internecie i mediach społecznościowych.",
    "W swych działaniach kolektyw odnosi się do aktualnych wydarzeń społecznych oraz politycznych a także do obowiązujących narracji historycznych kształtujących naszą tożsamość, poddając je krytycznej analizie i stosując strategie subwersji. W zależności od rodzaju podejmowanych działań, grupa zaprasza do współpracy innych artystów i inne artystki.",
  ],
  actionsTitle: "Akcje performatywne",
  actions: [
    { title: "Granica pogardy" },
    { title: "Jeszcze mamy prawo" },
    { title: "Polki walczące" },
    { title: "Ułańskie fantazje", with: "razem z fotografką Pat Mic" },
    { title: "Nie jesteś sama" },
    { title: "Pozdrowienia z Lesbos", with: "z Pat Mic" },
    { title: "BezKres nienawiści" },
    { title: "Koniec Panowania" },
    { title: "Orlice", with: "z Pat Mic" },
    { title: "Wolna Polska?", with: "współpraca z Biennale Warszawa, Joanną Szczepkowską i Pat Mic" },
    { title: "Aresztowanie Cricoteki", with: "z Pat Mic" },
  ],
  photosTitle: "Wybrane akcje",
  // order and credits as on the "czarne szmaty / #czsz – wybrane akcje" slide
  photos: [
    {
      src: "/photos/aresztowanie-cricoteki.jpg", title: "Aresztowanie Cricoteki", wide: true,
      with: "#czsz + Pat Mic", photo: "fot. Pat Mic", place: "Kraków", year: 2021,
      alt: "Trzy performerki w policyjnych mundurach i z doklejonymi wąsami stoją przed budynkiem Cricoteki w Krakowie.",
    },
    {
      // NOTE: cut from the slide (512 px wide); replace with the original file when available
      src: "/photos/wolna-polska.jpg", title: "Wolna Polska?",
      with: "#czsz + Biennale Warszawa + Joanna Szczepkowska + Pat Mic", photo: "fot. Pat Mic", place: "Warszawa", year: 2019,
      alt: "Pomnik Warszawskiej Nike z biało-czerwoną szarfą na tle wieżowca i błękitnego nieba.",
    },
    {
      src: "/photos/orlice.jpg", title: "Orlice",
      with: "#czsz + Pat Mic", photo: "fot. Pat Mic", place: "Warszawa", year: 2018,
      alt: "Trzy performerki w maskach orłów z koronami i czerwonych pelerynach na tle budynku we mgle.",
    },
    {
      src: "/photos/pozdrowienia-z-lesbos.jpg", title: "Pozdrowienia z Lesbos", wide: true,
      with: "#czsz + Pat Mic", photo: "fot. Pat Mic", place: "Warszawa", year: 2018,
      alt: "Trzy performerki w strojach kąpielowych pozują na miejskim skrzyżowaniu przy tablicy z napisem „Lesbos”.",
    },
    {
      src: "/photos/ulanskie-fantazje.jpg", title: "Ułańskie fantazje",
      with: "#czsz + Pat Mic", photo: "fot. Pat Mic", place: "Warszawa", year: 2017,
      alt: "Dwie postaci w historycznych mundurach i z doklejonymi wąsami obejmują się w jesiennym parku.",
    },
    {
      src: "/photos/granica-pogardy.jpg", title: "Granica pogardy",
      with: "#czsz", photo: "fot. Katarzyna Nurowska", place: "Warszawa", year: 2016,
      alt: "Uczestniczki akcji trzymają w poprzek ulicy długi czarny transparent z napisem „Granica pogardy”.",
    },
  ],
  more: { before: "Więcej informacji znajdziesz na ", linkText: "Facebooku", href: "https://www.facebook.com/czarneszmaty" },
};

export interface Award {
  /** shown once per year group; omit when unknown (the entry then sits in the group above) */
  year?: number;
  title: string;
  festival?: string;
  description?: string;
  list?: string[];
}

// Full list of awards: the "Nagrody" section on O mnie (left column, after Praca dydaktyczna).
export const awardsTitle = "Nagrody";
export const awards: Award[] = [
  {
    year: 2022, title: "Grand Prix",
    festival: "26. Międzynarodowy Festiwal Teatru dla Dzieci i Młodzieży „Korczak dzisiaj” w Warszawie",
    description: "Spektakl „Tonja z Glimmerdalen”: „za wykorzystanie polifonicznych możliwości teatru w służbie opowieści o dziecięcej sprawczości. Za trafny wybór tekstu i adaptację. Za koncepcję scenograficzną, muzyczność oraz zespołowe aktorstwo.”",
  },
  {
    year: 2020, title: "Grand Prix",
    festival: "XIII Międzynarodowy Festiwal Teatralny „Boska Komedia” w Krakowie",
    description: "Spektakl „Rutka” zrealizowany w Teatrze Lalek Arlekin w Łodzi, sekcja festiwalu: Mała Boska Komedia.",
  },
  {
    year: 2020, title: "Nagroda za najlepszą reżyserię",
    festival: "27. Festiwal Teatrów Lalek „Spotkania” w Toruniu",
    description: "Reżyseria spektaklu „Rutka” w Teatrze Lalek Arlekin w Łodzi.",
  },
  {
    year: 2020, title: "Nagroda im. Jana Wilkowskiego",
    festival: "27. Festiwal Teatrów Lalek „Spotkania” w Toruniu",
    description: "Spektakl „Rutka” „za poruszającą wyobraźnię widza, wielopoziomową, nowoczesną i historyczną animację”.",
  },
  {
    // year not given in the source
    title: "Wyróżnienie jury profesjonalnego oraz wyróżnienie jury młodzieżowego",
    festival: "25. Międzynarodowy Festiwal Teatru dla Dzieci i Młodzieży „Korczak dzisiaj” w Warszawie",
    description: "Spektakl „Rutka” zrealizowany w Teatrze Lalek Arlekin w Łodzi.",
  },
  {
    title: "Spektakl „Rutka” otrzymał również szereg innych nagród",
    list: [
      "Nagrody aktorskie za najlepszą rolę kobiecą dla Katarzyny Pałki i Teresy Kowalik: V Festiwal Małych Prapremier w Wałbrzychu, 11. Międzynarodowy Festiwal Teatrów Ożywionej Formy „Maskarada” w Rzeszowie, 34. Międzynarodowy Festiwal „Walizka” w Łomży, 27. Festiwal Teatrów Lalek „Spotkania” w Toruniu",
      "Nagrody za najlepszą scenografię: 27. Festiwal Teatrów Lalek „Spotkania” w Toruniu, 26. Festiwal na Wystawienie Polskiej Sztuki Współczesnej",
      "Nagroda za muzykę: 26. Festiwal na Wystawienie Polskiej Sztuki Współczesnej",
      "Finalista: 26. Festiwal na Wystawienie Polskiej Sztuki Współczesnej",
      "Nominacja do „Plastrów Kultury” i „Energii Kultury” w kategorii „spektakl roku”",
    ],
  },
  {
    year: 2016, title: "Nagroda dla najlepszego spektaklu przyznana przez jury dziecięce",
    festival: "III Festiwal Małych Prapremier w Wałbrzychu",
    description: "Dla spektaklu „Ronja, córka zbójnika” z Teatru Pinokio w Łodzi.",
  },
  {
    year: 2016, title: "Nagroda dla najlepszego spektaklu przyznana przez jury młodzieżowe",
    festival: "XXI Międzynarodowy Festiwal Teatrów dla Dzieci i Młodzieży „Korczak”",
    description: "Dla spektaklu „Ronja, córka zbójnika” Teatru Pinokio w Łodzi.",
  },
  {
    year: 2016, title: "Złota Maska",
    festival: "Za najlepszy spektakl w teatrach lalkowych w sezonie 2015/2016",
    description: "Dla spektaklu „Ronja, córka zbójnika” zrealizowanego w Teatrze Pinokio w Łodzi.",
  },
  {
    year: 2014, title: "Złota Maska",
    festival: "Za najlepszy spektakl w teatrach lalkowych w sezonie 2013/2014",
    description: "Za spektakl „Koralina” zrealizowany w Teatrze Pinokio w Łodzi.",
  },
];

export interface Production {
  title: string;
  /** Karolina's role, shown in the caption as "ROLE — KAROLINA MACIEJASZEK" */
  role: string;
  theatre: string;
  year: number;
  image?: { src: string; alt: string };
  /** full-width slot on Reżyseria (only for photos at least ~1600px wide); the rest pair up side by side */
  wide?: true;
  /** the curtain description, one sentence per entry; names the original author */
  paragraphs: string[];
}

// Reżyseria: selected productions, newest first.
// "Na podstawie tekstu …" sentences were added where the description did not name the author yet.
export const productions: Production[] = [
  {
    title: "Olbrzyyym", wide: true, role: "Reżyseria", theatre: "Wrocławski Teatr Lalek", year: 2025,
    image: { src: "/photos/olbrzyyym.jpg", alt: "Scena zalana czerwonym światłem: aktorzy wokół przezroczystej, świecącej kurtyny." },
    paragraphs: [
      "Spektakl familijny na podstawie dramatu Philippe’a Dorina.",
    ],
  },
  {
    title: "Harun i morze opowieści", role: "Reżyseria, adaptacja, teksty piosenek", theatre: "Teatr Lalka w Warszawie", year: 2025,
    image: { src: "/photos/harun.jpg", alt: "Dwóch aktorów na tle fioletowego morza; jeden w kamizelce ratunkowej, drugi w pióropuszu z pomarańczowych piór." },
    paragraphs: [
      "Spektakl familijny, będący adaptacją powieści słynnego autora, Salmana Rushdiego.",
    ],
  },
  {
    title: "Huśtawka", role: "Reżyseria, adaptacja, teksty piosenek", theatre: "Teatr Maska w Rzeszowie", year: 2024,
    image: { src: "/photos/hustawka.jpg", alt: "Dwie postaci-lalki siedzą na miękkim, fioletowym podeście pod zwisającymi pasami materiału." },
    paragraphs: [
      "Spektakl dla widowni dziecięcej operujący narzędziami szeroko pojętego teatru formy.",
      "Na podstawie tekstu Timo Parveli.",
    ],
  },
  {
    title: "Hystericon", wide: true, role: "Adaptacja i reżyseria", theatre: "Teatr Akademii Sztuk Teatralnych w Krakowie, Filii we Wrocławiu", year: 2023,
    image: { src: "/photos/hystericon.jpg", alt: "Aktor w masce starca opiera się o stos kartonowych pudeł." },
    paragraphs: [
      "Spektakl dramatyczny na podstawie współczesnego dramatu zrealizowany ze studentami Akademii Sztuk Teatralnych.",
      "Na podstawie tekstu Ingrid Lausund.",
    ],
  },
  {
    title: "Tonja z Glimmerdalen", role: "Reżyseria i adaptacja", theatre: "Miejski Teatr Miniatura w Gdańsku", year: 2022,
    image: { src: "/photos/tonja.jpg", alt: "Aktorzy w swetrach przy stole z czerwonym obrusem na tle drewnianej ściany." },
    paragraphs: [
      "Spektakl familijny na podstawie kultowej powieści skandynawskiej autorki.",
      "Nagrodzony Grand Prix na 26. Międzynarodowym Festiwalu Korczak w Warszawie.",
      "Na podstawie tekstu Marii Parr.",
    ],
  },
  {
    title: "Opowieść wigilijna", role: "Reżyseria, adaptacja, teksty piosenek", theatre: "Nowy Teatr w Słupsku", year: 2021,
    image: { src: "/photos/opowiesc-wigilijna.jpg", alt: "Chłopiec i starszy mężczyzna w ozdobnym szlafroku czytają razem książkę, siedząc na scenie." },
    paragraphs: [
      "Spektakl familijny, klasyczna opowieść według Charlesa Dickensa w nowej odsłonie.",
    ],
  },
  {
    title: "Rutka", wide: true, role: "Reżyseria i adaptacja", theatre: "Teatr Lalek Arlekin w Łodzi", year: 2020,
    image: { src: "/photos/rutka.jpg", alt: "Aktorzy budują miasto z czerwonych klocków w niebiesko-czerwonym świetle." },
    paragraphs: [
      "Spektakl zrealizowany w ramach Konkursu im. Jana Dormana Instytutu Teatralnego w Warszawie.",
      "Przedstawienie prezentowane i nagradzane na licznych festiwalach teatralnych w kraju i za granicą.",
      "Na podstawie tekstu Joanny Fabickiej.",
    ],
  },
  {
    title: "Akademia Pana Kleksa", role: "Reżyseria i adaptacja", theatre: "Teatr Lalki i Aktora w Wałbrzychu", year: 2020,
    image: { src: "/photos/akademia-pana-kleksa.png", alt: "Aktor prowadzi lalkę przed oszkloną konstrukcją, w której przykucnięta jest postać w bieli." },
    paragraphs: [
      "Spektakl dla widowni dziecięcej operujący narzędziami teatru formy na podstawie powieści Jana Brzechwy.",
      "Współczesne odczytanie znanej powieści.",
    ],
  },
  {
    title: "Królowa śniegu", role: "Reżyseria i adaptacja", theatre: "Śląski Teatr Ateneum w Katowicach", year: 2019,
    image: { src: "/photos/krolowa-sniegu.jpg", alt: "Aktorki w fantazyjnych nakryciach głowy z lustrzanymi taflami na ciemnej scenie." },
    paragraphs: [
      "Spektakl dla widowni dziecięcej operujący środkami teatru lalek na podstawie klasycznej baśni.",
      "Nowe odczytanie znanej opowieści.",
      "Na podstawie tekstu H. Ch. Andersena.",
    ],
  },
  {
    title: "Fru-Fru", wide: true, role: "Reżyseria i scenariusz", theatre: "Olsztyński Teatr Lalek", year: 2019,
    image: { src: "/photos/fru-fru.jpg", alt: "Rząd świecących, białych kul przypominających lampiony na czarnym tle." },
    paragraphs: [
      "Spektakl dla najmłodszych widzów (od lat 4) na podstawie picture booka „Metamorfoza Fru-Fru”.",
      "Przedstawienie operujące narzędziami szeroko pojętego teatru formy.",
      "Na podstawie tekstu Nguyen Tran Thien Loc.",
    ],
  },
  {
    title: "Dzieci obcych bogów", role: "Reżyseria", theatre: "Festiwal Dotknij Teatru w Łodzi", year: 2018,
    image: { src: "/photos/dzieci-obcych-bogow.jpg", alt: "Aktor w niebieskiej kurtce przy stole w synagodze; w tle wiolonczelistka." },
    paragraphs: [
      "Spektakl oparty na scenariuszu według tekstów dokumentalnych (relacji dzieci różnych narodowości mieszkających w łódzkim getcie) z użyciem fragmentów autorskiego tekstu „Wyspa Chudych”.",
      "Projekt zrealizowany w Synagodze Reicherów w Łodzi z aktorami Teatru Nowego oraz Teatru Lalek Arlekin.",
    ],
  },
  {
    title: "Piotruś Pan", role: "Reżyseria", theatre: "Teatr Lalki i Aktora w Wałbrzychu", year: 2016,
    image: { src: "/photos/piotrus-pan.jpg", alt: "Postaci w spiczastych czapkach w kłębach niebieskiego dymu na szachownicowej podłodze." },
    paragraphs: [
      "Na podstawie tekstu J.M. Barriego.",
    ],
  },
  {
    title: "Ronja, córka zbójnika", wide: true, role: "Reżyseria", theatre: "Teatr Pinokio w Łodzi", year: 2016,
    image: { src: "/photos/ronja.jpg", alt: "Zbójnicy w futrach i hełmach z rogami wspinają się na pochyłą drewnianą płytę." },
    paragraphs: [
      "Na podstawie tekstu Astrid Lindgren.",
    ],
  },
  {
    title: "Wołanie miasta", role: "Reżyseria", theatre: "Teatr Pinokio w Łodzi", year: 2015,
    image: { src: "/photos/wolanie-miasta.jpg", alt: "Zespół muzyczny na scenie w różowym świetle; wokalistka w czerwonej marynarce." },
    paragraphs: [
      "Na podstawie tekstu Andrzeja Barta.",
    ],
  },
  {
    title: "Koralina", role: "Reżyseria", theatre: "Teatr Pinokio w Łodzi", year: 2013,
    image: { src: "/photos/koralina.jpg", alt: "Aktorka z durszlakiem na głowie i czerwonym szalikiem wyciąga rękę; obok postać w białym futrze." },
    paragraphs: [
      "Na podstawie tekstu Neila Gaimana.",
    ],
  },
  {
    title: "Disco pigs", role: "Reżyseria", theatre: "Teatr Rawa w Katowicach", year: 2013,
    image: { src: "/photos/disco-pigs.jpg", alt: "Dwoje młodych aktorów w dynamicznym ruchu w kręgu światła na ciemnej scenie." },
    paragraphs: [
      "Na podstawie tekstu Endy Walsha.",
    ],
  },
  {
    title: "Woyzeck", role: "Reżyseria", theatre: "Teatr im. Jaracza w Olsztynie", year: 2007,
    image: { src: "/photos/woyzeck.jpg", alt: "Aktorka w żółtej bluzce z rękami uniesionymi do głowy w ciepłym świetle." },
    paragraphs: [
      "Na podstawie tekstu Georga Buchnera.",
    ],
  },
];

export type Content = typeof pl;

export const sections: Section[] = pl.sections;

export const num = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;

export const sectionByPath = (path: string | null) =>
  sections.find((s) => "/" + s.slug === path?.replace(/\/$/, "")) ?? null;
