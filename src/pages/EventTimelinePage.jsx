import { useState } from "react";
import { ChevronLeft, Calendar, MapPin, ArrowRight, ExternalLink, Newspaper, ChevronDown } from "lucide-react";

const eventsData = [
  {
    id: "israel-palestine",
    title: "Israel–Palestine Conflict",
    subtitle: "Decades of tension erupting into modern crisis",
    image: "https://images.unsplash.com/photo-1602517301037-0f36c4e45193?w=600&q=80",
    color: "from-red-500 to-orange-500",
    accentColor: "red",
    timeline: [
      {
        date: "1917",
        title: "Balfour Declaration",
        location: "United Kingdom",
        description:
          "Britain pledged support for a \"national home for the Jewish people\" in Palestine, setting the stage for decades of competing national claims over the same land.",
        impact: "Planted the seed for conflicting national aspirations",
        articles: [
          { title: "Balfour Declaration", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Balfour_Declaration" },
          { title: "The Balfour Declaration: A Century On", source: "BBC News", url: "https://www.bbc.com/news/world-middle-east-41765892" },
        ],
      },
      {
        date: "1948",
        title: "Creation of Israel & Nakba",
        location: "Palestine / Israel",
        description:
          "Israel declared independence after the UN partition plan. Neighboring Arab states invaded. Around 700,000 Palestinians were displaced in what they call the Nakba (catastrophe).",
        impact: "Created the refugee crisis that persists to this day",
        articles: [
          { title: "1948 Palestinian Exodus", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/1948_Palestinian_exodus" },
          { title: "1948 Arab–Israeli War", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/1948_Arab%E2%80%93Israeli_War" },
          { title: "The Birth of Israel: A History", source: "Al Jazeera", url: "https://www.aljazeera.com/features/2018/5/15/the-nakba-did-not-start-or-end-in-1948" },
        ],
      },
      {
        date: "1967",
        title: "Six-Day War",
        location: "Middle East",
        description:
          "Israel captured the West Bank, Gaza Strip, Sinai Peninsula, and Golan Heights in a swift military victory, beginning a military occupation that reshaped the region.",
        impact: "Began the occupation of Palestinian territories",
        articles: [
          { title: "Six-Day War", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Six-Day_War" },
          { title: "How the Six-Day War Changed the Middle East", source: "BBC News", url: "https://www.bbc.com/news/world-middle-east-39960461" },
        ],
      },
      {
        date: "1987",
        title: "First Intifada",
        location: "West Bank & Gaza",
        description:
          "A mass Palestinian uprising against Israeli occupation erupted, featuring strikes, boycotts, and stone-throwing, drawing global attention to the Palestinian cause.",
        impact: "Internationalized the Palestinian struggle",
        articles: [
          { title: "First Intifada", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/First_Intifada" },
          { title: "The Intifada: How It Started and What It Meant", source: "Reuters", url: "https://www.reuters.com/world/middle-east/" },
        ],
      },
      {
        date: "1993",
        title: "Oslo Accords",
        location: "Oslo, Norway",
        description:
          "Israel and the PLO signed a historic peace agreement establishing the Palestinian Authority and a framework for Palestinian self-governance. Hopes for a two-state solution peaked.",
        impact: "Closest the two sides came to lasting peace",
        articles: [
          { title: "Oslo Accords", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Oslo_Accords" },
          { title: "What Were the Oslo Accords?", source: "Al Jazeera", url: "https://www.aljazeera.com/news/2023/9/13/what-were-the-oslo-accords" },
        ],
      },
      {
        date: "2005",
        title: "Israeli Withdrawal from Gaza",
        location: "Gaza Strip",
        description:
          "Israel unilaterally withdrew settlers and military from Gaza. Hamas subsequently won elections in 2006 and took full control of Gaza in 2007, leading to a blockade.",
        impact: "Gaza became isolated under blockade",
        articles: [
          { title: "Israeli Disengagement from Gaza", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Israeli_disengagement_from_Gaza" },
          { title: "Blockade of the Gaza Strip", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Blockade_of_the_Gaza_Strip" },
        ],
      },
      {
        date: "2008–2021",
        title: "Repeated Gaza Conflicts",
        location: "Gaza Strip",
        description:
          "Multiple military operations in Gaza (2008, 2012, 2014, 2021) caused devastating casualties and destruction, while rocket fire into Israel continued. Each cycle deepened the humanitarian crisis.",
        impact: "Entrenched cycle of violence and suffering",
        articles: [
          { title: "Gaza–Israel Conflict", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Gaza%E2%80%93Israel_conflict" },
          { title: "Gaza Wars: A Timeline of Conflict", source: "BBC News", url: "https://www.bbc.com/news/world-middle-east-28439404" },
        ],
      },
      {
        date: "Oct 7, 2023",
        title: "Hamas Attack & War Erupts",
        location: "Southern Israel / Gaza",
        description:
          "Hamas launched a surprise large-scale attack on southern Israel, killing around 1,200 people and taking over 200 hostages. Israel launched a massive military campaign in Gaza, causing unprecedented destruction and a severe humanitarian crisis with tens of thousands of casualties.",
        impact: "Deadliest escalation in the conflict's modern history",
        articles: [
          { title: "2023 Hamas-led Attack on Israel", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/2023_Hamas-led_attack_on_Israel" },
          { title: "Israel–Hamas War", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Israel%E2%80%93Hamas_war" },
          { title: "What Happened on October 7?", source: "BBC News", url: "https://www.bbc.com/news/world-middle-east-67039975" },
        ],
      },
    ],
  },
  {
    id: "russia-ukraine",
    title: "Russia–Ukraine War",
    subtitle: "From Soviet collapse to full-scale invasion",
    image: "https://images.unsplash.com/photo-1646488872625-accf080ed2b6?w=600&q=80",
    color: "from-blue-500 to-yellow-500",
    accentColor: "blue",
    timeline: [
      {
        date: "1991",
        title: "Ukraine Declares Independence",
        location: "Ukraine",
        description:
          "After the collapse of the Soviet Union, Ukraine declared independence. It inherited the world's third-largest nuclear arsenal, which it later gave up in exchange for security assurances from Russia, the US, and UK (Budapest Memorandum, 1994).",
        impact: "Ukraine emerged as an independent nation between Russia and the West",
        articles: [
          { title: "Declaration of Independence of Ukraine", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Declaration_of_Independence_of_Ukraine" },
          { title: "Budapest Memorandum on Security Assurances", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Budapest_Memorandum" },
        ],
      },
      {
        date: "2004",
        title: "Orange Revolution",
        location: "Kyiv, Ukraine",
        description:
          "Mass protests against a rigged presidential election led to a re-vote and the election of pro-Western candidate Viktor Yushchenko. Russia viewed this as Western interference in its sphere of influence.",
        impact: "Deepened the tug-of-war between Russia and the West over Ukraine",
        articles: [
          { title: "Orange Revolution", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Orange_Revolution" },
          { title: "Ukraine's Orange Revolution Revisited", source: "BBC News", url: "https://www.bbc.com/news/world-europe-30131108" },
        ],
      },
      {
        date: "2013–2014",
        title: "Euromaidan Revolution",
        location: "Kyiv, Ukraine",
        description:
          "President Yanukovych rejected an EU association agreement under Russian pressure. Massive protests erupted, eventually toppling his government. Russia saw this as a Western-backed coup.",
        impact: "Triggered Russia's direct military intervention",
        articles: [
          { title: "Euromaidan", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Euromaidan" },
          { title: "Ukraine Crisis: Timeline", source: "BBC News", url: "https://www.bbc.com/news/world-middle-east-26248275" },
        ],
      },
      {
        date: "March 2014",
        title: "Annexation of Crimea",
        location: "Crimea",
        description:
          "Russia annexed Crimea following a disputed referendum held under military occupation. The international community widely condemned the move and imposed sanctions on Russia.",
        impact: "First forcible annexation of territory in Europe since WWII",
        articles: [
          { title: "Annexation of Crimea by the Russian Federation", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Annexation_of_Crimea_by_the_Russian_Federation" },
          { title: "Crimea Profile", source: "BBC News", url: "https://www.bbc.com/news/world-europe-18287223" },
        ],
      },
      {
        date: "2014–2022",
        title: "War in Donbas",
        location: "Eastern Ukraine",
        description:
          "Russian-backed separatists seized parts of Donetsk and Luhansk regions. A simmering conflict killed over 14,000 people. Minsk peace agreements failed to hold, and tensions escalated steadily.",
        impact: "Created a frozen conflict that Russia later used as pretext for invasion",
        articles: [
          { title: "War in Donbas (2014–2022)", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/War_in_Donbas_(2014%E2%80%932022)" },
          { title: "Minsk Agreements", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Minsk_agreements" },
        ],
      },
      {
        date: "Feb 24, 2022",
        title: "Full-Scale Invasion",
        location: "Ukraine",
        description:
          "Russia launched a full-scale invasion of Ukraine from multiple directions, targeting Kyiv, Kharkiv, and southern Ukraine. Ukraine mounted fierce resistance, and the war became the largest conflict in Europe since World War II.",
        impact: "Reshaped global security, energy markets, and alliances",
        articles: [
          { title: "Russian Invasion of Ukraine", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Russian_invasion_of_Ukraine" },
          { title: "Russia Invades Ukraine: What We Know", source: "BBC News", url: "https://www.bbc.com/news/world-europe-60504334" },
          { title: "How the Invasion Unfolded", source: "Reuters", url: "https://www.reuters.com/world/europe/how-russias-invasion-ukraine-unfolded-2022-02-24/" },
        ],
      },
      {
        date: "2022–Present",
        title: "Prolonged War & Global Impact",
        location: "Ukraine / Global",
        description:
          "The war settled into grinding attrition with massive casualties on both sides. Western nations provided unprecedented military aid to Ukraine. The conflict triggered a global energy crisis, food shortages, and accelerated NATO expansion with Finland and Sweden joining.",
        impact: "Fundamentally altered the post-Cold War order in Europe",
        articles: [
          { title: "2022 Russia–Ukraine War Timeline", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Timeline_of_the_Russian_invasion_of_Ukraine" },
          { title: "Accession of Finland and Sweden to NATO", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Accession_of_Finland_to_NATO" },
        ],
      },
    ],
  },
  {
    id: "ai-revolution",
    title: "The AI Revolution",
    subtitle: "From academic theory to transforming civilization",
    image: "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=600&q=80",
    color: "from-purple-500 to-indigo-500",
    accentColor: "purple",
    timeline: [
      {
        date: "1956",
        title: "Birth of AI",
        location: "Dartmouth, USA",
        description:
          "The Dartmouth Conference coined the term 'Artificial Intelligence' and launched it as an academic field. Early optimism predicted human-level AI within a generation.",
        impact: "Established AI as a field of scientific study",
        articles: [
          { title: "Dartmouth Workshop", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dartmouth_workshop" },
          { title: "History of Artificial Intelligence", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_artificial_intelligence" },
        ],
      },
      {
        date: "1997",
        title: "Deep Blue Beats Kasparov",
        location: "New York, USA",
        description:
          "IBM's Deep Blue defeated world chess champion Garry Kasparov, demonstrating that machines could outperform humans in complex strategic tasks. It was a brute-force approach, not 'intelligent,' but it captured the public imagination.",
        impact: "Proved machines could beat humans in intellectual domains",
        articles: [
          { title: "Deep Blue (Chess Computer)", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)" },
          { title: "Deep Blue vs Kasparov", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov" },
        ],
      },
      {
        date: "2012",
        title: "Deep Learning Breakthrough",
        location: "Global",
        description:
          "AlexNet won the ImageNet competition by a huge margin using deep neural networks and GPU computing. This triggered an explosion of investment and research in deep learning that continues today.",
        impact: "Launched the modern deep learning era",
        articles: [
          { title: "AlexNet", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/AlexNet" },
          { title: "ImageNet Large Scale Visual Recognition Challenge", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/ImageNet#History_of_the_challenge" },
        ],
      },
      {
        date: "2017",
        title: "Transformer Architecture",
        location: "Google, USA",
        description:
          "Google researchers published 'Attention Is All You Need,' introducing the Transformer architecture. This became the foundation for virtually all modern large language models including GPT, BERT, and others.",
        impact: "The architectural breakthrough behind today's AI revolution",
        articles: [
          { title: "Transformer (Deep Learning Architecture)", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)" },
          { title: "Attention Is All You Need (Paper)", source: "arXiv", url: "https://arxiv.org/abs/1706.03762" },
        ],
      },
      {
        date: "Nov 2022",
        title: "ChatGPT Launch",
        location: "OpenAI, USA",
        description:
          "OpenAI released ChatGPT, which reached 100 million users in two months — the fastest-growing consumer application in history. It made AI capabilities tangible and accessible to everyday people for the first time.",
        impact: "Made AI a mainstream, everyday technology",
        articles: [
          { title: "ChatGPT", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/ChatGPT" },
          { title: "GPT-4", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/GPT-4" },
          { title: "The Inside Story of ChatGPT's Rise", source: "MIT Technology Review", url: "https://www.technologyreview.com/2023/03/03/1069311/inside-story-oral-history-how-chatgpt-built-openai/" },
        ],
      },
      {
        date: "2023–2024",
        title: "AI Arms Race",
        location: "Global",
        description:
          "Tech giants poured hundreds of billions into AI. Google launched Gemini, Anthropic released Claude, Meta open-sourced Llama. AI began transforming coding, writing, healthcare, law, and education at unprecedented speed.",
        impact: "Every major industry began restructuring around AI",
        articles: [
          { title: "Gemini (Language Model)", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Gemini_(language_model)" },
          { title: "Claude (Language Model)", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Claude_(language_model)" },
          { title: "LLaMA", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/LLaMA" },
        ],
      },
      {
        date: "2025–Present",
        title: "AI Agents & Regulation",
        location: "Global",
        description:
          "AI evolved from chat interfaces to autonomous agents capable of executing complex multi-step tasks. Governments worldwide scrambled to regulate AI, balancing innovation with safety. Debates intensified around job displacement, deepfakes, and AI in warfare.",
        impact: "Society grapples with AI's transformative and disruptive power",
        articles: [
          { title: "AI Safety", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/AI_safety" },
          { title: "Regulation of Artificial Intelligence", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Regulation_of_artificial_intelligence" },
        ],
      },
    ],
  },
  {
    id: "climate-crisis",
    title: "The Climate Crisis",
    subtitle: "How decades of warnings led to a global emergency",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
    color: "from-green-500 to-teal-500",
    accentColor: "green",
    timeline: [
      {
        date: "1896",
        title: "Greenhouse Effect Discovered",
        location: "Sweden",
        description:
          "Swedish scientist Svante Arrhenius first calculated that doubling atmospheric CO2 could raise global temperatures by 5–6°C. His work was largely ignored for decades.",
        impact: "First scientific prediction of human-caused global warming",
        articles: [
          { title: "Svante Arrhenius", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Svante_Arrhenius" },
          { title: "Greenhouse Effect", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Greenhouse_effect" },
        ],
      },
      {
        date: "1988",
        title: "NASA Scientist Sounds the Alarm",
        location: "Washington D.C., USA",
        description:
          "James Hansen testified before the US Congress that global warming was already happening and was caused by human activity. This brought climate change into mainstream political discourse.",
        impact: "Climate change entered public and political consciousness",
        articles: [
          { title: "James Hansen", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/James_Hansen" },
          { title: "Hansen's 1988 Testimony on Climate Change", source: "NASA", url: "https://climate.nasa.gov/" },
        ],
      },
      {
        date: "1997",
        title: "Kyoto Protocol",
        location: "Kyoto, Japan",
        description:
          "The first major international treaty committing nations to reduce greenhouse gas emissions was adopted. However, the US never ratified it, and major developing nations were exempt, limiting its impact.",
        impact: "First global attempt at binding emissions reduction",
        articles: [
          { title: "Kyoto Protocol", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Kyoto_Protocol" },
          { title: "United Nations Framework Convention on Climate Change", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/United_Nations_Framework_Convention_on_Climate_Change" },
        ],
      },
      {
        date: "2006",
        title: "An Inconvenient Truth",
        location: "Global",
        description:
          "Al Gore's documentary brought climate science to mass audiences, winning an Academy Award. Public awareness of climate change surged, but political polarization around the issue also deepened.",
        impact: "Climate change became a cultural and political flashpoint",
        articles: [
          { title: "An Inconvenient Truth", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/An_Inconvenient_Truth" },
          { title: "Al Gore and Climate Activism", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Al_Gore" },
        ],
      },
      {
        date: "2015",
        title: "Paris Agreement",
        location: "Paris, France",
        description:
          "196 countries agreed to limit global warming to well below 2°C, aiming for 1.5°C. It was hailed as a landmark deal, but commitments remained voluntary and insufficient to meet the targets.",
        impact: "Set the global temperature targets that guide climate policy today",
        articles: [
          { title: "Paris Agreement", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Paris_Agreement" },
          { title: "What Is the Paris Climate Agreement?", source: "BBC News", url: "https://www.bbc.com/news/science-environment-35073297" },
        ],
      },
      {
        date: "2018–2023",
        title: "Extreme Weather Escalates",
        location: "Global",
        description:
          "Record-breaking heatwaves, wildfires in Australia, California, and Canada, devastating floods in Pakistan and Libya, and rapidly melting ice sheets made climate change viscerally real for billions of people.",
        impact: "Climate change shifted from future threat to present reality",
        articles: [
          { title: "Effects of Climate Change", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Effects_of_climate_change" },
          { title: "2019–20 Australian Bushfire Season", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/2019%E2%80%9320_Australian_bushfire_season" },
          { title: "2022 Pakistan Floods", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/2022_Pakistan_floods" },
        ],
      },
      {
        date: "2024–Present",
        title: "Tipping Points & Urgency",
        location: "Global",
        description:
          "Scientists warned that several climate tipping points may have been crossed. Global temperatures breached 1.5°C above pre-industrial levels. Renewable energy surged but fossil fuel use remained stubbornly high, creating a race against time.",
        impact: "The window for preventing catastrophic change is rapidly closing",
        articles: [
          { title: "Tipping Points in the Climate System", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tipping_points_in_the_climate_system" },
          { title: "Renewable Energy Growth", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Renewable_energy" },
        ],
      },
    ],
  },
  {
    id: "us-china-tensions",
    title: "US–China Rivalry",
    subtitle: "From trade partners to strategic competitors",
    image: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=600&q=80",
    color: "from-red-600 to-blue-600",
    accentColor: "red",
    timeline: [
      {
        date: "2001",
        title: "China Joins the WTO",
        location: "Geneva, Switzerland",
        description:
          "China's entry into the World Trade Organization accelerated its integration into the global economy. Western leaders believed trade would liberalize China politically. Instead, China's state-driven model created massive trade surpluses and industrial dominance.",
        impact: "Launched China's rise as the world's manufacturing superpower",
        articles: [
          { title: "China and the World Trade Organization", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/China_and_the_World_Trade_Organization" },
          { title: "Accession of China to the WTO", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Accession_of_China_to_the_World_Trade_Organization" },
        ],
      },
      {
        date: "2015",
        title: "Made in China 2025",
        location: "Beijing, China",
        description:
          "China announced an ambitious plan to dominate high-tech industries including AI, semiconductors, robotics, and aerospace. Western nations grew alarmed at the strategic implications.",
        impact: "Signaled China's intent to lead in critical technologies",
        articles: [
          { title: "Made in China 2025", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Made_in_China_2025" },
          { title: "China's Industrial Policy Explained", source: "BBC News", url: "https://www.bbc.com/news/business-48196495" },
        ],
      },
      {
        date: "2018",
        title: "US–China Trade War Begins",
        location: "USA / China",
        description:
          "President Trump imposed tariffs on hundreds of billions of dollars of Chinese goods, citing unfair trade practices and IP theft. China retaliated. Global supply chains were disrupted.",
        impact: "Shattered the era of unchallenged economic globalization",
        articles: [
          { title: "China–United States Trade War", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/China%E2%80%93United_States_trade_war" },
          { title: "US-China Trade War: What's Happened So Far", source: "BBC News", url: "https://www.bbc.com/news/business-45899310" },
        ],
      },
      {
        date: "2019",
        title: "Huawei Ban & Tech Decoupling",
        location: "USA / Global",
        description:
          "The US banned Huawei from its 5G networks and restricted its access to American semiconductor technology. This marked the beginning of a broader tech decoupling between the two superpowers.",
        impact: "Technology became the central battleground of the rivalry",
        articles: [
          { title: "Sanctions Against Huawei", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sanctions_against_Huawei" },
          { title: "Huawei: Why Is It Being Banned?", source: "BBC News", url: "https://www.bbc.com/news/newsbeat-47041341" },
        ],
      },
      {
        date: "2022",
        title: "CHIPS Act & Semiconductor War",
        location: "USA / Taiwan",
        description:
          "The US passed the CHIPS Act, investing $52 billion in domestic semiconductor manufacturing. It also imposed sweeping export controls blocking China's access to advanced AI chips and chipmaking equipment.",
        impact: "Escalated tech rivalry into economic warfare over chips",
        articles: [
          { title: "CHIPS and Science Act", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/CHIPS_and_Science_Act" },
          { title: "US Export Controls on Semiconductors to China", source: "Reuters", url: "https://www.reuters.com/technology/" },
        ],
      },
      {
        date: "2023–Present",
        title: "AI Race & Taiwan Tensions",
        location: "Global",
        description:
          "Competition over AI leadership intensified as both nations raced to develop frontier models. Tensions over Taiwan, the world's most critical semiconductor hub, kept the risk of direct confrontation high. Both nations built competing economic blocs.",
        impact: "The world's two largest economies increasingly on a collision course",
        articles: [
          { title: "China–United States Relations", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/China%E2%80%93United_States_relations" },
          { title: "Taiwan Strait Crisis", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Taiwan_Strait" },
          { title: "TSMC and the Global Chip War", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/TSMC" },
        ],
      },
    ],
  },
];

const accentClasses = {
  red: {
    dot: "bg-red-500",
    ring: "ring-red-100",
    badge: "bg-red-50 text-red-700 border-red-200",
    impactBg: "bg-red-50 border-red-200",
    impactText: "text-red-800",
    line: "bg-red-200",
    articlesBg: "bg-red-50/50",
    articlesHover: "hover:bg-red-50",
    articlesBorder: "border-red-100",
    articlesText: "text-red-700",
  },
  blue: {
    dot: "bg-blue-500",
    ring: "ring-blue-100",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    impactBg: "bg-blue-50 border-blue-200",
    impactText: "text-blue-800",
    line: "bg-blue-200",
    articlesBg: "bg-blue-50/50",
    articlesHover: "hover:bg-blue-50",
    articlesBorder: "border-blue-100",
    articlesText: "text-blue-700",
  },
  purple: {
    dot: "bg-purple-500",
    ring: "ring-purple-100",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    impactBg: "bg-purple-50 border-purple-200",
    impactText: "text-purple-800",
    line: "bg-purple-200",
    articlesBg: "bg-purple-50/50",
    articlesHover: "hover:bg-purple-50",
    articlesBorder: "border-purple-100",
    articlesText: "text-purple-700",
  },
  green: {
    dot: "bg-green-500",
    ring: "ring-green-100",
    badge: "bg-green-50 text-green-700 border-green-200",
    impactBg: "bg-green-50 border-green-200",
    impactText: "text-green-800",
    line: "bg-green-200",
    articlesBg: "bg-green-50/50",
    articlesHover: "hover:bg-green-50",
    articlesBorder: "border-green-100",
    articlesText: "text-green-700",
  },
};

export default function EventTimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedArticles, setExpandedArticles] = useState(new Set());

  const toggleArticles = (index) => {
    setExpandedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (selectedEvent) {
    const event = eventsData.find((e) => e.id === selectedEvent);
    const accent = accentClasses[event.accentColor];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${event.color} text-white`}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            <button
              onClick={() => {
                setSelectedEvent(null);
                setExpandedArticles(new Set());
              }}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to all events
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-white/80 text-lg">{event.subtitle}</p>
            <div className="mt-4 flex items-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {event.timeline[0].date} — {event.timeline[event.timeline.length - 1].date}
              </span>
              <span className="mx-2">·</span>
              <span>{event.timeline.length} key events</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="relative">
            {/* Vertical line */}
            <div className={`absolute left-[19px] top-0 bottom-0 w-0.5 ${accent.line}`} />

            <div className="space-y-0">
              {event.timeline.map((item, index) => (
                <div key={index} className="relative pl-14 pb-10 group">
                  {/* Dot */}
                  <div
                    className={`absolute left-2.5 top-1 w-[14px] h-[14px] rounded-full ${accent.dot} ring-4 ${accent.ring} z-10`}
                  />

                  {/* Connector arrow (except last) */}
                  {index < event.timeline.length - 1 && (
                    <div className="absolute left-[13px] bottom-2 z-10">
                      <ArrowRight className={`w-3.5 h-3.5 rotate-90 ${accent.impactText} opacity-50`} />
                    </div>
                  )}

                  {/* Card */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    {/* Date & location bar */}
                    <div className="flex flex-wrap items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${accent.badge}`}>
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="px-5 py-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className={`mx-5 mb-4 px-4 py-3 rounded-lg border ${accent.impactBg}`}>
                      <p className={`text-sm font-semibold ${accent.impactText}`}>
                        <span className="opacity-60 mr-1.5">Impact:</span>
                        {item.impact}
                      </p>
                    </div>

                    {/* Related Articles */}
                    {item.articles && item.articles.length > 0 && (
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => toggleArticles(index)}
                          className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50/80 transition-colors"
                        >
                          <span className="inline-flex items-center gap-2 font-medium">
                            <Newspaper className="w-3.5 h-3.5" />
                            Related Articles ({item.articles.length})
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expandedArticles.has(index) ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {expandedArticles.has(index) && (
                          <div className={`px-5 pb-4 space-y-1.5`}>
                            {item.articles.map((article, aIdx) => (
                              <a
                                key={aIdx}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${accent.articlesBorder} ${accent.articlesBg} ${accent.articlesHover} transition-colors group/article`}
                              >
                                <ExternalLink className={`w-3.5 h-3.5 ${accent.articlesText} opacity-60 shrink-0`} />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-800 truncate group-hover/article:text-gray-900">
                                    {article.title}
                                  </p>
                                </div>
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${accent.badge} shrink-0`}>
                                  {article.source}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* End marker */}
            <div className="relative pl-14">
              <div
                className={`absolute left-1.5 top-0 w-[18px] h-[18px] rounded-full ${accent.dot} ring-4 ${accent.ring} z-10 flex items-center justify-center`}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <p className="text-sm font-semibold text-gray-500 pt-0.5">Present day</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Event listing view
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Timelines</h1>
          <p className="text-gray-500 mt-2">
            Understand how major world events unfolded — the chain of events that led to where we are today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Gradient banner */}
              <div className={`h-2 bg-gradient-to-r ${event.color}`} />

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {event.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{event.subtitle}</p>

                {/* Mini timeline preview */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-400">
                    {event.timeline[0].date}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 relative min-w-[40px]">
                    {event.timeline.map((_, i) => (
                      <div
                        key={i}
                        className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${event.color}`}
                        style={{
                          left: `${(i / (event.timeline.length - 1)) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    {event.timeline[event.timeline.length - 1].date}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {event.timeline.length} key events
                  </span>
                  <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
