import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
          <p className="mt-2 text-muted-foreground">
            Zuletzt aktualisiert: 12.01.2025
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="overview">
            <AccordionTrigger>Überblick</AccordionTrigger>
            <AccordionContent>
              Diese Datenschutzerklärung erläutert, wie Studentapp
              (&ldquo;wir&rdquo;, &ldquo;uns&rdquo;, &ldquo;unser&rdquo;) Ihre
              personenbezogenen Daten erfasst, verwendet und schützt. Durch die
              Nutzung unseres Dienstes stimmen Sie der Erfassung und Verwendung
              von Informationen gemäß dieser Richtlinie zu.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-collection">
            <AccordionTrigger>Informationen, die wir sammeln</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Wir erfassen und speichern folgende Arten von Informationen:
              </p>
              <ul className="list-disc pl-6">
                <li>Kontoinformationen (E-Mail, Name)</li>
                <li>Schuljahrdaten und akademische Informationen</li>
                <li>Stundenplan- und Zeitplaninformationen</li>
                <li>Benutzereinstellungen</li>
                <li>Nutzungsdaten und Analysen</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-storage">
            <AccordionTrigger>
              Datenspeicherung und -verarbeitung
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Wir nutzen folgende Dienste zur Speicherung und Verarbeitung
                Ihrer Daten:
              </p>
              <ul className="list-disc pl-6">
                <li>Supabase für Datenbank-Hosting und Authentifizierung</li>
                <li>Vercel für Anwendungs-Hosting und Bereitstellung</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cookies">
            <AccordionTrigger>Cookies und Tracking</AccordionTrigger>
            <AccordionContent>
              Wir verwenden Cookies und ähnliche Tracking-Technologien, um
              Aktivitäten auf unserem Dienst zu verfolgen und bestimmte
              Informationen zu speichern. Cookies sind Dateien mit einer kleinen
              Datenmenge, die möglicherweise eine anonyme eindeutige Kennung
              enthalten.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-security">
            <AccordionTrigger>Datensicherheit</AccordionTrigger>
            <AccordionContent>
              Wir setzen angemessene Sicherheitsmaßnahmen ein, um vor unbefugtem
              Zugriff, Änderung, Offenlegung oder Zerstörung Ihrer persönlichen
              Daten zu schützen. Allerdings ist keine Übertragungsmethode über
              das Internet zu 100% sicher.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-rights">
            <AccordionTrigger>Ihre Datenschutzrechte</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Sie haben das Recht auf:</p>
              <ul className="list-disc pl-6">
                <li>Zugriff auf Ihre persönlichen Daten</li>
                <li>Korrektur ungenauer Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Export Ihrer Daten</li>
                <li>Widerruf der Einwilligung</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="analytics">
            <AccordionTrigger>Analytik und Tracking</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Wir verwenden Posthog für Analysezwecke. Dies bedeutet:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Anonymisierte Erfassung von Nutzungsstatistiken (z.B. besuchte
                  Seiten, Verweildauer)
                </li>
                <li>Analyse von Funktionsnutzung zur Verbesserung der App</li>
                <li>Keine personenbezogene Verfolgung einzelner Nutzer</li>
                <li>Opt-out ist nur durch die Nichtnutzung der App möglich.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Kontaktinformationen</AccordionTrigger>
            <AccordionContent>
              Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns
              bitte unter:{" "}
              <a
                href="mailto:contact@ignotum.dev"
                className="text-primary hover:underline"
              >
                contact@ignotum.dev
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
