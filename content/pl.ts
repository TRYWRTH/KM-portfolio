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
  tagline: "reżyserka · performerka · wykładowczyni",
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
    { id: "czsz", slug: "czarne-szmaty", label: "Kolektyw Czarne Szmaty", mobileHide: "Kolektyw", bg: "/photos/granica-pogardy.jpg", side: "l" },
    { id: "contact", slug: "kontakt", label: "Kontakt", bg: "/photos/ulanskie-fantazje.jpg", side: "r", topBar: true },
  ] satisfies Section[],
};

// O mnie: bio + timeline (education, Kalendarium) + teaching at the Akademia.
export const about = {
  lead: "Reżyserka, performerka, wykładowczyni.",
  bio: [
    "Absolwentka reżyserii na Akademii Teatralnej im. Aleksandra Zelwerowicza w Warszawie oraz teatrologii na Uniwersytecie Jagiellońskim w Krakowie. Debiutowała w 2007 roku spektaklem „Woyzeck” w Teatrze im. Jaracza w Olsztynie.",
    "Pracuje w teatrach dramatycznych i lalkowych, instytucjonalnych i offowych. W ostatnich latach aktywnie działa w teatrze formy: łączącym elementy teatru dramatycznego i teatru plastycznego.",
    "Nagradzana za spektakle dla młodzieży: m.in. Grand Prix 26. Międzynarodowego Festiwalu Teatru dla dzieci i młodzieży „Korczak dzisiaj” w Warszawie 2022 za przedstawienie „Tonja z Glimmerdalen” zrealizowane w Miejskim Teatrze Miniatura w Gdańsku, Grand Prix XIII Festiwalu Mała Boska Komedia w Krakowie 2020, Nagroda za najlepszą reżyserię na 27. Festiwalu Teatrów Lalek „Spotkania” w Toruniu, Wyróżnienia jury profesjonalnego i jury młodzieżowego na 25. Międzynarodowym Festiwalu Teatrów dla Dzieci i Młodzieży „Korczak dzisiaj” dla spektaklu „Rutka” zrealizowanego w Teatrze Arlekin w Łodzi.",
    "Współzałożycielka i członkini kolektywu akcjonistycznego „Czarne Szmaty”. Wykładowczyni w Akademii Sztuk Teatralnych w Krakowie, Filii we Wrocławiu, w latach 2020–2024 Prodziekanka d.s. reżyserii na w/w uczelni.",
  ],
  teachingTitle: "Praca dydaktyczna",
  teaching: "Od 2020 roku zatrudniona na stanowisku asystentki badawczo-dydaktycznej w Akademii Sztuk Teatralnych w Krakowie, Filii we Wrocławiu, w latach 2020–2024 Prodziekanka d.s. reżyserii Wydziału Lalkarskiego.",
  coursesTitle: "Prowadzone zajęcia",
  courses: [
    { name: "Propedeutyka reżyserii", field: "kierunek: reżyseria" },
    { name: "Czytanie performatywne", field: "kierunek: reżyseria" },
    { name: "Reżyseria teatru formy", field: "kierunek: reżyseria" },
    { name: "Sceny współczesne", field: "kierunek: aktorstwo teatru lalek oraz reżyseria" },
  ],
  experienceTitle: "Doświadczenie",
  experience: [
    { years: "1998–2003", title: "Teatrologia", detail: "Instytut Polonistyki, Uniwersytet Jagielloński w Krakowie" },
    { years: "2002–2008", title: "Akademia Teatralna im. Aleksandra Zelwerowicza w Warszawie", detail: "Studia magisterskie" },
    { years: "2007–obecnie", title: "Reżyseria teatralna", detail: "Realizacje w teatrach dramatycznych i lalkowych" },
    { years: "2016–obecnie", title: "Performerka w kolektywie Czarne Szmaty", detail: "Współzałożycielka i członkini kolektywu akcjonistycznego" },
    {
      years: "2020–obecnie",
      title: "Akademia Sztuk Teatralnych w Krakowie, Filia we Wrocławiu",
      detail: "Wykładowczyni na Wydziale Lalkarskim, w latach 2020–2024 prodziekanka d.s. reżyserii Wydziału Lalkarskiego",
    },
  ],
};

// Kolektyw Czarne Szmaty
export const collective = {
  paragraphs: [
    "Kolektyw akcjonistyczny Czarne Szmaty założony w 2016 (wspólnie z Martą Jalowską i Magdaleną Staroszczyk) działa w obrębie szeroko pojętej sztuki performatywnej – performensu, street artu, happeningu – używając do nawiązania dialogu społecznego różnych mediów.",
    "Odpowiadając na nowe modele komunikacji, konfrontacyjny aspekt działań Czarnych Szmat przyjmuje różne formy, od bezpośredniej konfrontacji w przestrzeni miejskiej do publikacji w internecie i mediach społecznościowych.",
    "W swych działaniach kolektyw odnosi się do aktualnych wydarzeń społecznych oraz politycznych a także do obowiązujących narracji historycznych kształtujących naszą tożsamość, poddając je krytycznej analizie i stosując strategie subwersji. W zależności od rodzaju podejmowanych działań, grupa zaprasza do współpracy innych artystów i inne artystki.",
  ],
  actionsTitle: "Grupa zrealizowała następujące akcje performatywne",
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
      src: "/photos/aresztowanie-cricoteki.jpg", title: "Aresztowanie Cricoteki",
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
      src: "/photos/pozdrowienia-z-lesbos.jpg", title: "Pozdrowienia z Lesbos",
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

// Nagrody (shown on O mnie, after Doświadczenie).
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
  year: number;
  /** optional photo: a production with one is shown as a big picture with a short description */
  image?: { src: string; alt: string };
  title: string;
  /** author in the form used on the poster ("Philippe’a Dorina", "wg Andrzeja Barta") */
  author?: string;
  venue: string;
  description?: string;
}

// Reżyseria: selected productions, newest first.
export const productions: Production[] = [
  {
    year: 2025, title: "Olbrzyyym", image: { src: "/photos/olbrzyyym.jpg", alt: "Scena zalana czerwonym światłem: aktorzy wokół przezroczystej, świecącej kurtyny." }, author: "Philippe’a Dorina", venue: "Wrocławski Teatr Lalek",
    description: "Spektakl familijny na podstawie dramatu Philippe’a Dorina. Premiera: 4.10.2025.",
  },
  {
    year: 2025, title: "Harun i morze opowieści", image: { src: "/photos/harun.jpg", alt: "Dwóch aktorów na tle fioletowego morza; jeden w kamizelce ratunkowej, drugi w pióropuszu z pomarańczowych piór." }, author: "Salman Rushdie", venue: "Teatr Lalka w Warszawie",
    description: "Spektakl familijny, będący adaptacją powieści słynnego autora, Salmana Rushdiego. Reżyseria, adaptacja, teksty piosenek. Premiera: 1.03.2025.",
  },
  {
    year: 2024, title: "Huśtawka", image: { src: "/photos/hustawka.jpg", alt: "Dwie postaci-lalki siedzą na miękkim, fioletowym podeście pod zwisającymi pasami materiału." }, author: "Timo Parvela", venue: "Teatr Maska w Rzeszowie",
    description: "Spektakl dla widowni dziecięcej operujący narzędziami szeroko pojętego teatru formy. Reżyseria, adaptacja, teksty piosenek.",
  },
  {
    year: 2023, title: "Hystericon", image: { src: "/photos/hystericon.jpg", alt: "Aktor w masce starca opiera się o stos kartonowych pudeł." }, author: "Ingrid Lausund", venue: "Teatr Akademii Sztuk Teatralnych w Krakowie, Filii we Wrocławiu",
    description: "Spektakl dramatyczny na podstawie współczesnego dramatu zrealizowany ze studentami Akademii Sztuk Teatralnych. Adaptacja i reżyseria.",
  },
  {
    year: 2022, title: "Tonja z Glimmerdalen", image: { src: "/photos/tonja.jpg", alt: "Aktorzy w swetrach przy stole z czerwonym obrusem na tle drewnianej ściany." }, author: "Maria Parr", venue: "Miejski Teatr Miniatura w Gdańsku",
    description: "Spektakl familijny na podstawie kultowej powieści skandynawskiej autorki. Nagrodzony Grand Prix na 26. Międzynarodowym Festiwalu Korczak w Warszawie. Reżyseria i adaptacja.",
  },
  { year: 2021, title: "Opowieść wigilijna", image: { src: "/photos/opowiesc-wigilijna.jpg", alt: "Chłopiec i starszy mężczyzna w ozdobnym szlafroku czytają razem książkę, siedząc na scenie." }, author: "Charles Dickens", venue: "Nowy Teatr w Słupsku",
    description: "Spektakl familijny, klasyczna opowieść według Charlesa Dickensa w nowej odsłonie. Reżyseria, adaptacja, teksty piosenek.",
  },
  {
    year: 2020, title: "Rutka", image: { src: "/photos/rutka.jpg", alt: "Aktorzy budują miasto z czerwonych klocków w niebiesko-czerwonym świetle." }, author: "Joanna Fabicka", venue: "Teatr Lalek Arlekin w Łodzi",
    description: "Spektakl zrealizowany w ramach Konkursu im. Jana Dormana Instytutu Teatralnego w Warszawie. Przedstawienie prezentowane i nagradzane na licznych festiwalach teatralnych w kraju i za granicą. Reżyseria i adaptacja.",
  },
  {
    year: 2020, title: "Akademia Pana Kleksa", image: { src: "/photos/akademia-pana-kleksa.png", alt: "Aktor prowadzi lalkę przed oszkloną konstrukcją, w której przykucnięta jest postać w bieli." }, author: "Jan Brzechwa", venue: "Teatr Lalki i Aktora w Wałbrzychu",
    description: "Spektakl dla widowni dziecięcej operujący narzędziami teatru formy na podstawie powieści Jana Brzechwy. Współczesne odczytanie znanej powieści. Reżyseria i adaptacja.",
  },
  {
    year: 2019, title: "Królowa śniegu", image: { src: "/photos/krolowa-sniegu.jpg", alt: "Aktorki w fantazyjnych nakryciach głowy z lustrzanymi taflami na ciemnej scenie." }, author: "H. Ch. Andersen", venue: "Śląski Teatr Ateneum w Katowicach",
    description: "Spektakl dla widowni dziecięcej operujący środkami teatru lalek na podstawie klasycznej baśni. Nowe odczytanie znanej opowieści. Reżyseria i adaptacja.",
  },
  {
    year: 2019, title: "Fru-Fru", image: { src: "/photos/fru-fru.jpg", alt: "Rząd świecących, białych kul przypominających lampiony na czarnym tle." }, author: "Nguyen Tran Thien Loc", venue: "Olsztyński Teatr Lalek",
    description: "Spektakl dla najmłodszych widzów (od lat 4) na podstawie picture booka „Metamorfoza Fru-Fru”. Przedstawienie operujące narzędziami szeroko pojętego teatru formy. Reżyseria i scenariusz.",
  },
  {
    year: 2018, title: "Dzieci obcych bogów", image: { src: "/photos/dzieci-obcych-bogow.jpg", alt: "Aktor w niebieskiej kurtce przy stole w synagodze; w tle wiolonczelistka." }, venue: "Festiwal Dotknij Teatru w Łodzi",
    description: "Spektakl oparty na scenariuszu według tekstów dokumentalnych (relacji dzieci różnych narodowości mieszkających w łódzkim getcie) z użyciem fragmentów autorskiego tekstu „Wyspa Chudych”. Projekt zrealizowany w Synagodze Reicherów w Łodzi z aktorami Teatru Nowego oraz Teatru Lalek Arlekin.",
  },
  { year: 2016, title: "Piotruś Pan", image: { src: "/photos/piotrus-pan.jpg", alt: "Postaci w spiczastych czapkach w kłębach niebieskiego dymu na szachownicowej podłodze." }, author: "J.M. Barrie", venue: "Teatr Lalki i Aktora w Wałbrzychu" },
  { year: 2016, title: "Ronja, córka zbójnika", image: { src: "/photos/ronja.jpg", alt: "Zbójnicy w futrach i hełmach z rogami wspinają się na pochyłą drewnianą płytę." }, author: "Astrid Lindgren", venue: "Teatr Pinokio w Łodzi" },
  { year: 2015, title: "Wołanie miasta", image: { src: "/photos/wolanie-miasta.jpg", alt: "Zespół muzyczny na scenie w różowym świetle; wokalistka w czerwonej marynarce." }, author: "wg Andrzeja Barta", venue: "Teatr Pinokio w Łodzi" },
  { year: 2013, title: "Koralina", image: { src: "/photos/koralina.jpg", alt: "Aktorka z durszlakiem na głowie i czerwonym szalikiem wyciąga rękę; obok postać w białym futrze." }, author: "Neil Gaiman", venue: "Teatr Pinokio w Łodzi" },
  { year: 2013, title: "Disco pigs", image: { src: "/photos/disco-pigs.jpg", alt: "Dwoje młodych aktorów w dynamicznym ruchu w kręgu światła na ciemnej scenie." }, author: "Enda Walsh", venue: "Teatr Rawa w Katowicach" },
  { year: 2007, title: "Woyzeck", image: { src: "/photos/woyzeck.jpg", alt: "Aktorka w żółtej bluzce z rękami uniesionymi do głowy w ciepłym świetle." }, author: "Georg Buchner", venue: "Teatr im. Jaracza w Olsztynie" },
];

export type Content = typeof pl;

export const sections: Section[] = pl.sections;

export const num = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;

export const sectionByPath = (path: string | null) =>
  sections.find((s) => "/" + s.slug === path?.replace(/\/$/, "")) ?? null;
