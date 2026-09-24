export const site = {
  name: "ApiLab",
  // Pozor: tenhle soubor exportuje i konstantu `process` (sekce Jak pracujeme),
  // takže se tu nesmí sahat na process.env — env override řeší app/layout.tsx.
  url: "https://www.apilab.cz",
  email: "hello@apilab.cz",
  owner: "Adam Hitzger",
  ico: "19712049",
  address: "Ledečská 2984, 580 01 Havlíčkův Brod",
  legal: "Fyzická osoba zapsaná v živnostenském rejstříku",
  tagline:
    "Softwarová agentura pro automatizaci firemních a výrobních procesů, dat a AI.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const nav = [
  { label: "O nás", href: "/o-nas" },
  { label: "Služby", href: "/#sluzby" },
  { label: "Projekty", href: "/projekty" },
  { label: "Partneři", href: "/#integrace" },
];

export const hero = {
  eyebrow: "AUTOMATIZACE · DATA · AI",
  lead:
    "Navrhujeme a stavíme automatizace, datové pipeline a AI nástroje pro výrobní i obchodní firmy — od scrapingu dat přes napojení na CRM až po dashboardy pro CNC výrobu.",
  stats: ["15+ API, se kterými pracujeme", "Scraping dat denně", "Provoz 24/7"],
  dashboard: [
    { icon: "↻", tone: "lime", title: "Apify → Databáze", sub: "Scraping dat, denně 6:00", status: "Aktivní" },
    { icon: "→", tone: "yellow", title: "Meta Ads → CRM", sub: "Nové leady synchronizovány", status: "Aktivní" },
    { icon: "✓", tone: "lime", title: "ČS → iDoklad", sub: "Platba ověřena a spárována", status: "Hotovo" },
  ],
};

export const why = {
  eyebrow: "PROČ APILAB",
  title: "Odborníci, kterým můžete svěřit procesy i data.",
  lead:
    "Jsme softwarová agentura pro automatizaci firemních a výrobních procesů. Stavíme na ověřených technologiích, k datům klientů přistupujeme jako k vlastním a držíme termíny — protože automatizace, na kterou se nedá spolehnout, nikomu čas neušetří.",
  pillars: [
    {
      title: "Odborníci napříč technologiemi",
      text: "Python, Rust, TypeScript, SQL, Make i n8n - rozumíme všemu ale automatizace programujeme v Rustu - šetří čas a peníze zaplacené za programy a výpočetní výkon.",
    },
    {
      title: "Bezpečnost a legálnost dat",
      text: "Data klientů zůstávají u klienta: šifrované přenosy, přístupy jen pro ty, kdo je potřebují, žádné sdílení třetím stranám. Sbíráme jen veřejná a legálně získatelná data.",
    },
    {
      title: "Rychlí a spolehliví",
      text: "Návrh do týdne, první automatizace v řádu dnů. Monitoring 24/7 hlídá, že to, co jednou spustíme, běží dál — a když ne, víme to dřív než vy.",
    },
  ],
};

export const services = {
  featured: {
    badge: "HLAVNÍ SPECIALIZACE",
    title: "Automatizace procesů",
    text: "Napojujeme nástroje, které spolu doteď nemluvily. Scraping dat, synchronizace do CRM a databází i automatické workflow bez jediného kliknutí navíc.",
    chips: ["Apify", "API integrace", "Workflow", "CRM sync"],
  },
  secondary: [
    { icon: "chart", title: "Data & dashboardy", text: "Přehledné dashboardy a reporting nad vašimi daty — od výroby po marketing.", chips: ["Dashboardy","API", "Reporting", "ETL"] },
    { icon: "spark", title: "AI řešení", text: "AI nástroje pro zpracování dokumentů, dat a rozhodování uvnitř firmy.", chips: ["AI agenti", "Analýza dat", "Automatizace textu"] },
    { icon: "code", title: "Vývoj software", text: "Jednoduché weby i dashboardy a desktopové aplikace na míru.", chips: ["Web", "Databáze", "PLC"] },
    { icon: "target", title: "Reklama & analytika", text: "Nastavíme a propojíme reklamní účty i analytiku, ať víte, co skutečně funguje.", chips: ["Meta Ads", "TikTok Ads", "GA4", "GTM", "Hotjar"] },
  ],
};

export const pricing = {
  eyebrow: "CENÍK",
  title: "Ceník bez hvězdiček",
  lead:
    "Všechno je měsíční paušál — žádná vstupní investice ani jednorázová implementační faktura. V ceně je návrh, vývoj, provoz, monitoring i podpora. Rozsah balíčku ladíme podle vašeho zadání.",
  plans: [
    {
      name: "Základ",
      price: "5 000 Kč",
      note: "Pro první automatizaci, která vám ušetří čas hned.",
      features: ["3–4 napojené integrace", "E-mailová podpora do 48 h", "Monitoring provozu 24/7", "Měsíční report výsledků"],
      cta: "Chci tenhle balíček",
      featured: false,
    },
    {
      name: "Růst",
      price: "15 000 Kč",
      note: "Pro firmy, které automatizují víc než jeden proces.",
      features: ["Až 8 integrací", "Vlastní dashboard a reporting", "Prioritní podpora do 24 h", "Měsíční konzultace nad daty"],
      cta: "Chci tenhle balíček",
      featured: true,
    },
    {
      name: "Na míru",
      price: "od 30 000 Kč",
      note: "Pro provozy, kde automatizace běží ve velkém.",
      features: ["Neomezené integrace", "Dedikovaná podpora do 4 h", "SLA a garance dostupnosti", "Vlastní vývoj a rozšíření"],
      cta: "Domluvit konzultaci",
      featured: false,
    },
  ],
};

export const about = {
  eyebrow: "O NÁS",
  title: "Vznikli jsme, protože nás štvala ruční práce, co má dělat software.",
  paragraphs: [
    "Firmy běžně platí lidi za práci, kterou by měl dělat software — ruční přepisování objednávek mezi systémy, kontrola plateb v tabulce, spárování leadů z reklamy do CRM. Práce, která nikoho nebaví a při které vznikají chyby.",
    "Řešíme to jinak než většina „digitalizačních“ projektů: stavíme konkrétní automatizace na míru, které napojují nástroje, jež už používáte, místo aby je nahrazovaly. Každá spolupráce začíná stejně — sedneme si s vámi, projdeme proces krok po kroku a řekneme na rovinu, jestli se automatizace vyplatí.",
  ],
  stats: ["Založeno 2024", "10+ dokončených automatizací", "15+ API, se kterými pracujeme"],
  pillars: [
    { title: "Automatizace", text: "Procesy, které dřív zabíraly hodiny, běží samy — 24/7 a bez chyb." },
    { title: "Data", text: "Sbíráme, čistíme a propojujeme data tam, kde je potřebujete — v CRM, databázi i dashboardu." },
    { title: "AI & software", text: "Chytré nástroje a aplikace navržené přesně podle vašich procesů a potřeb.", accent: "AI" },
  ],
};

export const process = {
  eyebrow: "PROCES",
  title: "Od nápadu k automatizaci ve 4 krocích",
  steps: [
    { title: "Konzultace zdarma", text: "Probereme vaše procesy a najdeme, kde automatizace nejvíc ušetří čas i peníze." },
    { title: "Návrh řešení", text: "Do týdne dostanete konkrétní plán, rozsah práce a cenový odhad." },
    { title: "Vývoj & testování", text: "Stavíme iterativně — průběžně vidíte progres a můžete korigovat směr." },
    { title: "Nasazení & podpora", text: "Go-live, monitoring provozu a podpora po spuštění, ať vše běží dál." },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Otázky, co dostáváme nejčastěji",
  items: [
    {
      q: "Kolik automatizace stojí a od čeho se cena odvíjí?",
      a: "Pracujeme výhradně na měsíčním paušálu — nic neplatíte předem a implementace je součástí ceny. Výše paušálu se odvíjí od počtu napojených integrací, složitosti procesu a úrovně podpory: Základ začíná na 5 000 Kč měsíčně, Růst na 15 000 Kč. Po úvodním hovoru dostanete konkrétní nabídku, ne obecný rozptyl.",
    },
    {
      q: "Jak dlouho trvá realizace typického projektu?",
      a: "Návrh a rozsah máte do týdne od úvodního hovoru. Jednoduchá automatizace (napojení jednoho nástroje na CRM) běží v řádu dnů, komplexnější řešení s dashboardem obvykle do 4–6 týdnů. Stavíme iterativně, takže první části vidíte fungovat dřív, než je hotový celek.",
    },
    {
      q: "Máme částečně automatizováno — dá se na to navázat?",
      a: "Ano, a většinou je to ta lepší varianta. Napojujeme se na nástroje, které už používáte — Make, n8n, tabulky, CRM — a doplňujeme jen to, co chybí. Nic nebouráme, pokud to funguje.",
    },
    {
      q: "Jak řešíte bezpečnost a vlastnictví dat?",
      a: "Data zůstávají u vás: běží ve vaší databázi nebo cloudu, přístupy mají jen lidé, kteří je potřebují, a přenosy jsou šifrované. K bankovním a platebním API přistupujeme pouze pro čtení. Sbíráme jen veřejná a legálně získatelná data.",
    },
    {
      q: "Potřebujeme mít vlastní vývojáře nebo IT tým?",
      a: "Ne. Provoz, monitoring i úpravy jsou součástí paušálu. Od vás potřebujeme jen člověka, který proces zná a umí říct, co má být výsledkem.",
    },
    {
      q: "Co se děje po spuštění — poskytujete podporu a údržbu?",
      a: "Ano, to je smysl paušálu. Monitoring 24/7 hlídá každý běh, na výpadky reagujeme podle úrovně balíčku (48 h / 24 h / 4 h) a jednou měsíčně dostanete report, co automatizace udělala a kde se dá jít dál.",
    },
  ],
};

export const ctaBanner = {
  title: "Chcete vědět, jak bychom automatizaci řešili u vás?",
  text: "Bez závazků probereme váš provoz a řekneme, kde dává automatizace smysl.",
  button: "Domluvit nezávaznou konzultaci",
};

export const nextSteps = {
  eyebrow: "CO SE STANE PO ODESLÁNÍ",
  title: "Žádné call centrum. Ozve se přímo ten, kdo to bude stavět.",
  steps: [
    { title: "Do 24 hodin odpovíme", text: "Krátká odpověď e-mailem, jestli dává smysl se sejít — a pár doplňujících otázek k vašemu procesu." },
    { title: "30 minut nad vaším procesem", text: "Online hovor, kde si projdeme, co vás zdržuje, a na rovinu řekneme, kde má automatizace smysl." },
    { title: "Návrh a paušál do týdne", text: "Konkrétní plán, rozsah a měsíční cena. Bez závazků, bez hvězdiček." },
  ],
};
