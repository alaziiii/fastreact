import React from "react";

// The blog text content separated into a dedicated file
export const fastFashionText = `
Die Modewelt dreht sich immer schneller – neue Trends entstehen, verschwinden und werden schon bald von den nächsten überholt. Vor allem Marken, die im sogenannten Fast-Fashion-Segment angesiedelt sind, haben diesen Trend perfektioniert. Ihr Erfolgsrezept: Unmengen günstiger Kleidungsstücke, die innerhalb kürzester Zeit produziert und in die Läden gebracht werden. Dabei steht die Geschwindigkeit und niedrige Preise über allem.

Doch die Produktionsweise hat gravierende Folgen, die oft im Verborgenen bleiben. Für die Herstellung eines einzelnen Kleidungsstücks, etwa einer Jeans, wird eine erstaunliche Menge an Wasser benötigt. Es handelt sich nicht nur um die Wassermenge, die in der Produktion steckt, sondern auch um die Auswirkungen der dabei entstehenden Abwässer, die häufig Schadstoffe enthalten und die Umwelt stark belasten.

Viele dieser günstigen Teile werden zudem in fernen Ländern gefertigt, wo Produktionsstätten oft unter Bedingungen arbeiten, die für die Beschäftigten alles andere als fair sind. Niedrige Löhne, lange Arbeitszeiten und unsichere Arbeitsumgebungen sind keine Seltenheit. Dabei bleibt der Eindruck, dass die Kleidung günstig ist, indem an wichtigen Stellen gespart wird – nicht nur bei den Materialien, sondern auch bei den Menschen.

Ein weiterer Umweltfaktor ist der Transport: Um die schnelle Verfügbarkeit der Modeartikel zu gewährleisten, werden häufig schnelle, aber umweltschädliche Transportwege gewählt. Insbesondere der Lufttransport verursacht deutlich mehr Emissionen als alternative Methoden, was die Ökobilanz der Textilien weiter verschlechtert.

Auch die Materialien selbst tragen zum Problem bei. Viele Modeunternehmen setzen vor allem auf synthetische Fasern. Diese sind zwar günstig und leicht herzustellen, bergen jedoch langfristige Risiken für die Umwelt, da sie Mikroplastik freisetzen und oft schwer biologisch abbaubar sind.

Die Kehrseite des schnellen Konsums ist ein kurzer Lebenszyklus der Kleidungsstücke. Statt jahrelang getragen zu werden, finden viele Modeartikel nur wenige Male Verwendung, bevor sie ausgemustert und entsorgt werden. Dies führt zu riesigen Mengen an Textilabfällen, die häufig nicht sinnvoll recycelt werden können.

Im Gegensatz dazu steht die nachhaltige Mode. Sie verfolgt einen anderen Ansatz: langlebige Produkte, die weniger häufig erneuert werden müssen, lokal oder zumindest fair produziert sind und durch ihre Qualität überzeugen. Nachhaltige Marken legen Wert auf umweltschonende Produktionsprozesse und soziale Verantwortung.

Die Modebranche ist zweifellos eine der größten Herausforderungen für unseren Planeten – sowohl was Ressourcenverbrauch als auch Umweltschäden angeht. Doch bewusster Konsum, das Hinterfragen von Schnelllebigkeit und Qualität vor Quantität können helfen, diese Entwicklung zu stoppen.
`;

// Extract just the teaser (first 4 sentences)
export const getTeaser = () => {
  return fastFashionText
    .split("\n\n")[0]
    .split(". ")
    .slice(0, 4)
    .join(". ") + ".";
};

// Get the rest of the content
export const getFullContent = () => {
  return fastFashionText.split("\n\n").slice(1).join("\n\n");
};