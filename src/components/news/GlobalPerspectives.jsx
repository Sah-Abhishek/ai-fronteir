import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Quote } from "lucide-react";

const stories = [
  {
    id: "israel-gaza-war",
    topic: "Israel–Gaza War",
    event:
      "Israel's military campaign in Gaza following the Oct 7, 2023 Hamas attack",
    date: "October 2023 – Present",
    color: "from-red-500 to-orange-500",
    coverage: [
      {
        country: "United States",
        flag: "🇺🇸",
        outlet: "CNN",
        headline:
          "Israel expands military operations in Gaza as hostage negotiations stall",
        excerpt:
          "Israel has the right to defend itself against Hamas terrorism, US officials reiterated, while calling for minimizing civilian casualties. The focus remains on hostage recovery and dismantling Hamas's military infrastructure.",
        tone: "Pro-Israel framing",
        toneColor: "blue",
      },
      {
        country: "United Kingdom",
        flag: "🇬🇧",
        outlet: "BBC News",
        headline:
          "Gaza death toll mounts as humanitarian crisis deepens",
        excerpt:
          "The UN reports catastrophic conditions in Gaza with hospitals overwhelmed and food supplies critically low. Rights groups are calling for an independent investigation into potential violations of international law by both sides.",
        tone: "Balanced / Humanitarian focus",
        toneColor: "gray",
      },
      {
        country: "Qatar",
        flag: "🇶🇦",
        outlet: "Al Jazeera",
        headline:
          "Israel's bombardment of Gaza kills dozens more as siege tightens",
        excerpt:
          "The Israeli siege has created what officials describe as the worst humanitarian catastrophe in Gaza's history. Entire neighborhoods have been leveled, with survivors describing scenes of utter devastation and nowhere safe to flee.",
        tone: "Pro-Palestinian framing",
        toneColor: "green",
      },
      {
        country: "Israel",
        flag: "🇮🇱",
        outlet: "The Times of Israel",
        headline:
          "IDF makes progress dismantling Hamas tunnel network in northern Gaza",
        excerpt:
          "Military operations have uncovered extensive Hamas tunnel infrastructure, including command centers and weapons storage beneath civilian areas. Intelligence confirms terror operatives used hospitals and schools as cover.",
        tone: "Israeli security framing",
        toneColor: "blue",
      },
      {
        country: "South Africa",
        flag: "🇿🇦",
        outlet: "Daily Maverick",
        headline:
          "South Africa's ICJ genocide case forces world to confront Gaza reality",
        excerpt:
          "South Africa's legal action at the International Court of Justice has reframed the global conversation, drawing parallels to apartheid-era resistance and challenging Western governments' unconditional support for Israeli military operations.",
        tone: "Critical of Israel",
        toneColor: "red",
      },
      {
        country: "India",
        flag: "🇮🇳",
        outlet: "NDTV",
        headline:
          "India calls for restraint, two-state solution as Middle East tensions escalate",
        excerpt:
          "India has walked a diplomatic tightrope, condemning terrorism while calling for protection of civilians. New Delhi's historic ties with both Israel and Palestine shape a nuanced position focused on de-escalation and humanitarian aid.",
        tone: "Neutral / Diplomatic",
        toneColor: "gray",
      },
    ],
  },
  {
    id: "russia-ukraine-war",
    topic: "Russia–Ukraine War",
    event:
      "The ongoing full-scale Russian invasion of Ukraine and its global ramifications",
    date: "February 2022 – Present",
    color: "from-blue-500 to-yellow-400",
    coverage: [
      {
        country: "United States",
        flag: "🇺🇸",
        outlet: "The New York Times",
        headline:
          "Ukraine fights to hold the line as Western aid debates intensify",
        excerpt:
          "Ukrainian forces continue to demonstrate remarkable resilience against Russian aggression. However, delays in Western military aid and growing war fatigue in allied capitals threaten to undermine Kyiv's defensive capabilities at a critical moment.",
        tone: "Pro-Ukraine",
        toneColor: "blue",
      },
      {
        country: "Russia",
        flag: "🇷🇺",
        outlet: "RT (Russia Today)",
        headline:
          "Special military operation proceeds as NATO escalation threatens global security",
        excerpt:
          "Russian forces continue to achieve objectives in the special military operation aimed at denazification and demilitarization. NATO's reckless weapons supplies to the Kyiv regime risk dragging the alliance into direct conflict with a nuclear power.",
        tone: "Russian state narrative",
        toneColor: "red",
      },
      {
        country: "China",
        flag: "🇨🇳",
        outlet: "Global Times",
        headline:
          "US-led NATO expansion provoked Ukraine crisis, peace talks urgently needed",
        excerpt:
          "The root cause of the conflict lies in NATO's relentless eastward expansion, which ignored Russia's legitimate security concerns. China calls on all parties to pursue dialogue rather than pour more weapons into a proxy war fueled by Washington's hegemonic ambitions.",
        tone: "Pro-Russia / Anti-NATO",
        toneColor: "red",
      },
      {
        country: "Germany",
        flag: "🇩🇪",
        outlet: "Der Spiegel",
        headline:
          "Europe faces hard choices on Ukraine support amid economic strain",
        excerpt:
          "As Europe grapples with energy costs and inflation stemming from the war, debate grows over how long the continent can sustain military and financial support for Ukraine. German industry warns of lasting damage from the loss of cheap Russian energy.",
        tone: "Pragmatic European concern",
        toneColor: "gray",
      },
      {
        country: "India",
        flag: "🇮🇳",
        outlet: "The Hindu",
        headline:
          "India maintains strategic autonomy, continues Russian oil imports despite Western pressure",
        excerpt:
          "India has refused to join Western sanctions against Russia, citing its own energy security needs and long-standing defense partnership with Moscow. New Delhi has called for dialogue and diplomacy while significantly increasing purchases of discounted Russian crude oil.",
        tone: "Non-aligned / Pragmatic",
        toneColor: "gray",
      },
    ],
  },
  {
    id: "ai-regulation",
    topic: "AI Regulation & Safety",
    event:
      "Global debate over how to regulate artificial intelligence as capabilities rapidly advance",
    date: "2023 – Present",
    color: "from-purple-500 to-indigo-500",
    coverage: [
      {
        country: "United States",
        flag: "🇺🇸",
        outlet: "The Wall Street Journal",
        headline:
          "Silicon Valley pushes back against AI regulation, warns of stifling innovation",
        excerpt:
          "Tech executives argue that heavy-handed regulation will push AI development overseas and cost America its competitive edge. Industry leaders prefer self-governance and voluntary safety commitments over binding legislation that could slow the pace of innovation.",
        tone: "Pro-industry / Light regulation",
        toneColor: "blue",
      },
      {
        country: "European Union",
        flag: "🇪🇺",
        outlet: "Politico Europe",
        headline:
          "EU AI Act sets global standard with risk-based regulation framework",
        excerpt:
          "The European Union's landmark AI Act establishes the world's most comprehensive regulatory framework, categorizing AI systems by risk level and imposing strict requirements on high-risk applications. Brussels aims to be the global standard-setter for responsible AI.",
        tone: "Pro-regulation",
        toneColor: "green",
      },
      {
        country: "China",
        flag: "🇨🇳",
        outlet: "South China Morning Post",
        headline:
          "China races to lead in AI while tightening control over algorithms and data",
        excerpt:
          "Beijing has implemented a patchwork of AI regulations targeting algorithms, deepfakes, and generative AI, primarily focused on maintaining social stability and content control. China is simultaneously investing massively to challenge US dominance in AI development.",
        tone: "State-control framing",
        toneColor: "red",
      },
      {
        country: "United Kingdom",
        flag: "🇬🇧",
        outlet: "The Guardian",
        headline:
          "AI safety experts warn current regulations dangerously inadequate",
        excerpt:
          "Leading researchers warn that the pace of AI development far outstrips regulatory efforts. Former AI safety researchers from major labs have raised alarms about existential risks, calling for international treaties akin to nuclear non-proliferation agreements.",
        tone: "Safety-focused / Cautious",
        toneColor: "orange",
      },
      {
        country: "Japan",
        flag: "🇯🇵",
        outlet: "Nikkei Asia",
        headline:
          "Japan takes light-touch approach to AI governance, betting on industry growth",
        excerpt:
          "Japan has opted for a permissive regulatory environment to attract AI investment and compensate for its late entry into the generative AI race. Tokyo is betting that flexible guidelines rather than strict laws will help its tech sector catch up with US and Chinese rivals.",
        tone: "Pro-innovation",
        toneColor: "blue",
      },
    ],
  },
  {
    id: "us-china-trade",
    topic: "US–China Tech & Trade War",
    event:
      "Escalating economic confrontation between the world's two largest economies",
    date: "2018 – Present",
    color: "from-red-600 to-blue-600",
    coverage: [
      {
        country: "United States",
        flag: "🇺🇸",
        outlet: "Bloomberg",
        headline:
          "US tightens chip export controls to curb China's AI and military ambitions",
        excerpt:
          "The Biden administration expanded semiconductor export restrictions, targeting China's ability to develop advanced AI and military technologies. Officials argue the controls are essential for national security, even as US chip companies warn of billions in lost revenue.",
        tone: "National security framing",
        toneColor: "blue",
      },
      {
        country: "China",
        flag: "🇨🇳",
        outlet: "Xinhua News Agency",
        headline:
          "US tech hegemony and unilateral sanctions undermine global trade order",
        excerpt:
          "The United States' abuse of export controls and sanctions represents a blatant violation of free trade principles and an attempt to suppress China's legitimate technological development. Such actions will only accelerate China's drive for self-sufficiency in critical technologies.",
        tone: "Anti-US / Sovereignty framing",
        toneColor: "red",
      },
      {
        country: "Taiwan",
        flag: "🇹🇼",
        outlet: "Taipei Times",
        headline:
          "Taiwan caught in crossfire as chip war intensifies between superpowers",
        excerpt:
          "As home to TSMC, which manufactures the world's most advanced semiconductors, Taiwan finds itself at the center of the US-China tech rivalry. The island must navigate between its security alliance with Washington and the economic reality of Chinese markets.",
        tone: "Caught-in-the-middle anxiety",
        toneColor: "orange",
      },
      {
        country: "European Union",
        flag: "🇪🇺",
        outlet: "Financial Times",
        headline:
          "Europe risks becoming collateral damage in US-China decoupling",
        excerpt:
          "European manufacturers and tech companies face mounting pressure to choose sides as the US and China decouple their technology ecosystems. EU leaders warn that without a coordinated European industrial strategy, the continent will lose competitiveness to both superpowers.",
        tone: "European strategic concern",
        toneColor: "gray",
      },
      {
        country: "South Korea",
        flag: "🇰🇷",
        outlet: "Korea Herald",
        headline:
          "Samsung and SK Hynix navigate tightrope between US demands and China revenue",
        excerpt:
          "South Korean chipmakers face an impossible balancing act as US export controls restrict their operations in China, where they have invested billions in manufacturing facilities. Seoul seeks waivers to protect its companies from becoming casualties of great power rivalry.",
        tone: "Industry survival focus",
        toneColor: "orange",
      },
    ],
  },
  {
    id: "climate-cop",
    topic: "Climate Change & COP Summits",
    event:
      "Global negotiations on climate action as extreme weather events intensify worldwide",
    date: "2023 – Present",
    color: "from-green-500 to-teal-500",
    coverage: [
      {
        country: "United States",
        flag: "🇺🇸",
        outlet: "The Washington Post",
        headline:
          "US pledges new climate targets while fossil fuel production hits record highs",
        excerpt:
          "The contradiction at the heart of US climate policy: record renewable energy investment alongside record oil and gas production. Critics argue the administration is trying to satisfy both environmentalists and the energy industry ahead of elections.",
        tone: "Critical / Contradictions",
        toneColor: "orange",
      },
      {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        outlet: "Arab News",
        headline:
          "Kingdom champions realistic energy transition that includes hydrocarbons",
        excerpt:
          "Saudi Arabia argues that a hasty fossil fuel phase-out would devastate developing economies and cause energy poverty. The Kingdom advocates for carbon capture technology and a gradual transition that acknowledges the world's continued dependence on oil and gas.",
        tone: "Pro-fossil fuel / Gradualist",
        toneColor: "red",
      },
      {
        country: "Small Island States",
        flag: "🇲🇻",
        outlet: "Maldives Times",
        headline:
          "For sinking island nations, climate inaction is a death sentence",
        excerpt:
          "Leaders from Pacific and Indian Ocean island states made emotional appeals at COP, warning that rising sea levels threaten their very existence. They demanded binding commitments, loss-and-damage payments, and an end to what they called 'the slow genocide of our peoples.'",
        tone: "Existential urgency",
        toneColor: "red",
      },
      {
        country: "India",
        flag: "🇮🇳",
        outlet: "The Indian Express",
        headline:
          "India demands climate justice: rich nations must pay before asking developing world to cut emissions",
        excerpt:
          "India insists that Western nations, which are historically responsible for the vast majority of cumulative emissions, must lead on cutting emissions and finance the energy transition in developing countries. Asking a billion people to forgo development for climate goals is 'colonial thinking.'",
        tone: "Climate justice / Equity",
        toneColor: "green",
      },
      {
        country: "Germany",
        flag: "🇩🇪",
        outlet: "Deutsche Welle",
        headline:
          "Europe's green transition faces political backlash as costs bite",
        excerpt:
          "Right-wing parties across Europe are gaining ground by opposing climate policies they frame as elitist. Farmers' protests, rising energy bills, and the cost of heat pump mandates have turned the green transition into a political liability for governing parties.",
        tone: "Political backlash framing",
        toneColor: "orange",
      },
      {
        country: "China",
        flag: "🇨🇳",
        outlet: "China Daily",
        headline:
          "China leads world in renewable energy deployment, calls for fair climate framework",
        excerpt:
          "China installed more solar capacity last year than the rest of the world combined and dominates electric vehicle production. Beijing argues it is doing more than any nation on green energy while insisting that climate frameworks must respect its status as a developing country.",
        tone: "Achievement-focused / Defensive",
        toneColor: "blue",
      },
    ],
  },
];

const toneColors = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  orange: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  gray: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
};

export default function GlobalPerspectives() {
  const [expandedStory, setExpandedStory] = useState(null);

  const toggle = (id) =>
    setExpandedStory((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Global Perspectives
          </h2>
        </div>
        <p className="text-gray-500 text-sm">
          See how the same story is reported by different media outlets across
          the world. Compare narratives, notice what's emphasized or omitted,
          and form a more complete picture.
        </p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => {
          const isExpanded = expandedStory === story.id;

          return (
            <div
              key={story.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Story header — clickable */}
              <button
                onClick={() => toggle(story.id)}
                className="w-full text-left"
              >
                <div className={`h-1.5 bg-gradient-to-r ${story.color}`} />
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {story.topic}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {story.event}
                    </p>
                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-gray-400 font-medium">
                        {story.date}
                      </span>
                      <span className="text-gray-300">·</span>
                      <div className="flex -space-x-1">
                        {story.coverage.map((c, i) => (
                          <span
                            key={i}
                            className="text-base"
                            title={c.country}
                          >
                            {c.flag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {story.coverage.length} perspectives
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded coverage */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {/* Narrative spectrum bar */}
                  <div className="px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Narrative Spectrum
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {story.coverage.map((c, i) => {
                        const tc = toneColors[c.toneColor];
                        return (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tc.bg} ${tc.border} ${tc.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${tc.dot}`}
                            />
                            {c.flag} {c.tone}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coverage cards */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {story.coverage.map((c, i) => {
                      const tc = toneColors[c.toneColor];
                      return (
                        <div
                          key={i}
                          className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                          {/* Country & outlet bar */}
                          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{c.flag}</span>
                              <div>
                                <p className="text-sm font-bold text-gray-900">
                                  {c.country}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {c.outlet}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${tc.bg} ${tc.border} ${tc.text}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${tc.dot}`}
                              />
                              {c.tone}
                            </span>
                          </div>

                          {/* Headline & excerpt */}
                          <div className="px-5 py-4">
                            <h4 className="font-bold text-gray-900 mb-2 leading-snug">
                              {c.headline}
                            </h4>
                            <div className="flex gap-3">
                              <Quote className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-600 leading-relaxed italic">
                                {c.excerpt}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Takeaway */}
                  <div className="px-5 sm:px-6 py-4 bg-indigo-50 border-t border-indigo-100">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                      Why this matters
                    </p>
                    <p className="text-sm text-indigo-900">
                      Comparing how different countries cover the same event
                      reveals editorial choices — what's highlighted, what's
                      omitted, and how language shapes perception. No single
                      outlet tells the full story.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
