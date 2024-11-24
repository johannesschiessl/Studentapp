import { ChangeType } from "@/components/site/changelog/changelog-item";

export interface ChangelogEntry {
  date: string;
  type: ChangeType;
  title: string;
  description: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2024-11-24",
    type: "new",
    title: "Weitere Verbesserungen",
    description:
      "Fächer in der Seitenleiste sind nun standardmäßig zugeklappt, wobei nur die ersten fünf angezeigt werden. Vorlagen für häufige Fächer hinzugefügt. Tagesüberschriften auf der Hausaufgabenseite ins Deutsche übersetzt. Ein Menü zum Teilen der Student-App mit Freunden hinzugefügt.",
  },
  {
    date: "2024-11-22",
    type: "new",
    title: "Prüfungsstatistiken hinzugefügt",
    description:
      "Prüfungsstatistiken auf der Prüfungsseite eingeführt. Diese können in den Einstellungen aktiviert werden. Sie zeigen interessante Statistiken wie Notenverlauf, Anzahl der Notentypen und Durchschnittsnote pro Typ.",
  },
  {
    date: "2024-11-21",
    type: "fix",
    title: "Kleine Korrekturen",
    description:
      "Einen Fehler behoben, der die App beim Bearbeiten des Stundenplans abstürzen ließ. Das Kaffee-Icon in Tee umbenannt (dies war ein Nutzerwunsch, den wir sehr ernst nehmen). Den Onboarding-Prozess verbessert.",
  },
  {
    date: "2024-11-20",
    type: "fix",
    title: "Optimierungen der Public Beta",
    description:
      "Einen Fehler behoben, der zu falschen Notenberechnungen führte. Die Kalenderseite ins Deutsche übersetzt. Einen Fehler behoben, der das Bearbeiten von Prüfungen verhinderte. Die Ladezeit des Kalenders drastisch verbessert (wobei noch Optimierungspotenzial besteht). Mobile Einstellungen, PWA-Unterstützung und weitere kleine Verbesserungen hinzugefügt.",
  },
  {
    date: "2024-11-18",
    type: "new",
    title: "Public Beta Release",
    description:
      "Student-App ist nun in der öffentlichen Beta verfügbar. Ab sofort können Nutzer Schuljahre erstellen, Fächer hinzufügen, Prüfungen und Hausaufgaben verwalten sowie ihren Stundenplan anzeigen und bearbeiten. Noten werden jetzt ebenfalls berechnet. Nutzer können auch den aktuellen Tagesplan auf dem Startbildschirm sehen.",
  },
];
