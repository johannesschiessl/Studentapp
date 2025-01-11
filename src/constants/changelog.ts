import { ChangeType } from "@/components/site/changelog/changelog-item";

export interface ChangelogEntry {
  date: string;
  type: ChangeType;
  title: string;
  description: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "12. Januar 2025",
    type: "new",
    title: "Die App ist jetzt bereit für dich!",
    description:
      "Die App ist jetzt schneller und stabiler als je zuvor! Außerdem haben wir die Public Beta offiziell beendet – ab jetzt ist alles bereit für euch.",
  },
  {
    date: "28. Dezember 2024",
    type: "fix",
    title: "Fehler in der Seitenleiste behoben",
    description:
      "Die Fächer in der Seitenleiste wurden nicht mehr angezeigt – das Problem ist jetzt behoben.",
  },
  {
    date: "24. Dezember 2024",
    type: "fix",
    title: "Stundenplan-Anzeige korrigiert",
    description:
      "Stunden im Stundenplan wurden falsch angezeigt und waren immer eine Stunde später. Das passt jetzt wieder!",
  },
  {
    date: "30. November 2024",
    type: "new",
    title: "Support für Österreich",
    description:
      "Ab sofort kannst du Österreich als Land und das österreichische Notensystem auswählen.",
  },
  {
    date: "30. November 2024",
    type: "new",
    title: "Fächer teilen",
    description:
      "Teile deine Fächer ganz einfach mit Freunden – so könnt ihr sie schnell importieren und nutzen.",
  },
  {
    date: "24. November 2024",
    type: "new",
    title: "Gesamtdurchschnitt berechnen",
    description:
      "Auf der Startseite und der Fächerseite wird jetzt dein Gesamtdurchschnitt angezeigt. Mit aktivierten Statistiken gibt es sogar noch mehr Infos über deine Noten.",
  },
  {
    date: "24. November 2024",
    type: "new",
    title: "Zukünftige Prüfungen auf einen Blick",
    description:
      "Deine anstehenden Prüfungen werden jetzt direkt auf der Startseite angezeigt.",
  },
  {
    date: "24. November 2024",
    type: "new",
    title: "Mehr Komfort im Alltag",
    description:
      "Die Fächer in der Seitenleiste sind jetzt standardmäßig zugeklappt, es werden nur deine Favoriten angezeigt. Außerdem gibt es Vorlagen für häufige Fächer, deutsche Tagesüberschriften bei den Hausaufgaben und ein Menü, um die App mit Freunden zu teilen.",
  },
  {
    date: "22. November 2024",
    type: "new",
    title: "Prüfungsstatistiken hinzugefügt",
    description:
      "In den Einstellungen kannst du jetzt Prüfungsstatistiken aktivieren, die dir den Notenverlauf, die Anzahl der Notentypen und den Durchschnitt pro Typ anzeigen.",
  },
  {
    date: "21. November 2024",
    type: "fix",
    title: "Ein paar Kleinigkeiten verbessert",
    description:
      "Ein Problem beim Bearbeiten des Stundenplans, das die App abstürzen ließ, wurde behoben. Außerdem ist das Kaffee-Icon jetzt ein Tee-Icon (ein viel gewünschtes Update!). Auch das Onboarding wurde überarbeitet.",
  },
  {
    date: "20. November 2024",
    type: "fix",
    title: "Optimierungen der Public Beta",
    description:
      "Ein Fehler bei der Notenberechnung wurde korrigiert, die Kalenderseite ist jetzt auf Deutsch, und das Bearbeiten von Prüfungen funktioniert wieder. Außerdem haben wir die Ladezeit des Kalenders stark verbessert und mobile Einstellungen sowie PWA-Unterstützung hinzugefügt.",
  },
  {
    date: "18. November 2024",
    type: "new",
    title: "Public Beta gestartet",
    description:
      "Die Student-App ist jetzt in der öffentlichen Beta verfügbar! Erstelle Schuljahre, füge Fächer hinzu, verwalte Prüfungen und Hausaufgaben und behalte deinen Stundenplan im Blick. Auch deine Noten werden direkt berechnet, und der Tagesplan ist auf der Startseite sichtbar.",
  },
];
