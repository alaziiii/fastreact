import React, { useState } from "react";

const fastFashionText = `
Fast Fashion beschreibt die schnelle Produktion von günstiger Mode, die aktuelle Trends aufgreift und in kürzester Zeit in die Geschäfte bringt. Dieses Geschäftsmodell erfreut sich vor allem bei jungen Konsumenten großer Beliebtheit, da es ermöglicht, ständig neue Kleidung zu kaufen, ohne viel Geld auszugeben.

Doch die Schattenseiten sind enorm: Die Textilindustrie gehört zu den größten Umweltverschmutzern weltweit. Für die Herstellung von Kleidung werden enorme Mengen Wasser benötigt, häufig unter Einsatz von giftigen Chemikalien. Außerdem verursachen Produktion und Transport hohe CO₂-Emissionen. Die Wegwerfmentalität, die Fast Fashion fördert, führt zu gigantischen Mengen an Textilabfällen, die meist nicht recycelt werden.

Neben der Umwelt belasten auch die sozialen Bedingungen in Produktionsländern die Modeindustrie. Oft arbeiten Menschen unter schlechten Bedingungen und für niedrige Löhne in Fabriken.

Wenn wir nachhaltiger konsumieren möchten, sollten wir auf Qualität statt Quantität achten, Second-Hand-Mode unterstützen und Kleidungsstücke länger tragen oder reparieren.

Nur so können wir die negativen Auswirkungen der Fast Fashion eindämmen und unseren Planeten schützen.

---

Fast Fashion verändert die Modewelt radikal. Unternehmen wie Shein bringen täglich tausende neue Designs heraus und setzen damit neue Maßstäbe für Schnelligkeit und niedrige Preise. Dieses Modell basiert auf einer datengetriebenen Produktion in kleinen Chargen und extrem kurzen Lieferzeiten.

Das Ergebnis ist ein Überangebot an Kleidung, das Konsumenten zum ständigen Nachkauf verleitet. Jährlich werden weltweit Millionen Tonnen Textilien produziert und entsorgt – mit verheerenden Folgen für Umwelt und Gesellschaft.

Neben dem enormen Wasserverbrauch trägt auch die Freisetzung von Mikroplastikfasern durch synthetische Materialien zur Verschmutzung der Meere bei. Etwa 35% aller Mikroplastikpartikel stammen aus Textilien.

In Deutschland fallen jährlich etwa 1,3 Millionen Tonnen Textilabfälle an, von denen nur ein geringer Anteil recycelt wird. Die meisten Kleidungsstücke landen auf Deponien oder werden verbrannt.

Die Modeindustrie ist für rund 10% der globalen CO₂-Emissionen verantwortlich – mehr als internationale Flüge und Schifffahrt zusammen.

Wer bewusster konsumiert, kauft weniger, dafür nachhaltiger und bevorzugt Second-Hand oder fair produzierte Kleidung. Reparieren statt wegwerfen ist ein wichtiger Schritt, um Ressourcen zu schonen und Umweltbelastungen zu reduzieren.
`;

const BlogPost: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false);

  // Teaser: first 4 sentences of first paragraph
  const teaser = fastFashionText
    .split("\n\n")[0]
    .split(". ")
    .slice(0, 4)
    .join(". ") + ".";

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-8 drop-shadow-md">
          Fast Fashion: <span className="underline decoration-red-400 decoration-4">Die versteckte Umweltkrise</span>
        </h1>

        <div
          className={`relative rounded-lg bg-white dark:bg-slate-900 p-8 text-left text-lg leading-relaxed text-slate-800 dark:text-slate-200 shadow-xl
            transition-all duration-700 ease-in-out
            ${!showFullText ? "max-h-[220px] overflow-hidden" : "max-h-full"}
          `}
          aria-expanded={showFullText}
          aria-describedby="fast-fashion-text"
        >
          <p className="mb-6 font-semibold">{teaser}</p>

          <div
            id="fast-fashion-text"
            className={`prose prose-lg dark:prose-invert
              transition-opacity duration-700 ease-in-out
              ${showFullText ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            style={{ whiteSpace: "pre-line" }}
          >
            {fastFashionText.split("\n\n").slice(1).join("\n\n")}
          </div>

          {!showFullText && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent rounded-lg"
              aria-hidden="true"
            />
          )}
        </div>

        <button
          onClick={() => setShowFullText((v) => !v)}
          className="mt-6 inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-transform focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700"
          aria-controls="fast-fashion-text"
          aria-expanded={showFullText}
        >
          {showFullText ? "Weniger anzeigen" : "Weiterlesen"}
        </button>
      </div>
    </section>
  );
};

export default BlogPost;
