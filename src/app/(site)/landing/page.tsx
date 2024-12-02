import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Smile } from "lucide-react";
import { TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-24">
        <div className="space-y-8 text-center">
          <Badge className="bg-indigo-100 text-sm text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500">
            Public Beta
          </Badge>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Lerne <span className="text-indigo-500">smarter</span>,{" "}
            <span className="text-amber-500">einfacher</span> und{" "}
            <span className="text-blue-500">besser</span> organisiert
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Die All-in-One App für Schüler. Verwalte Noten, Hausaufgaben und
            Lernmaterialien in einer modernen und intuitiven App.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/login">Jetzt kostenlos starten</Link>
            </Button>
            <Button size="lg" variant="outline" className="hidden">
              {" "}
              {/* HIDDEN UNTIL WE HAVE A DEMO */}
              Demo ansehen
            </Button>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/landing/hero.PNG"
              alt="Student-App auf iPhone und iPad"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Notenübersicht",
      description:
        "Behalte den Überblick über deine Leistungen in allen Fächern.",
      image: "/landing/subjects.PNG",
    },
    {
      title: "Hausaufgaben-Tracker",
      description:
        "Verpasse nie wieder eine Abgabe mit unserem intelligenten Aufgabenmanager.",
      image: "/landing/homework.PNG",
    },
    {
      title: "Digitale Karteikarten",
      description:
        "Lerne effektiv mit personalisierten Lernkarten für jedes Fach.",
      image: "/landing/deck.PNG",
    },
  ];

  return (
    <section className="container space-y-24 py-24">
      {features.map((feature, index) => (
        <div key={index} className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {feature.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {feature.description}
            </p>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Bessere Noten",
      description:
        "Durch strukturiertes Lernen und Überblick über deine Leistungen.",
      icon: TrendingUp,
      color: "sky",
    },
    {
      title: "Weniger Stress",
      description:
        "Organisiere deinen Schulalltag effizient und reduziere Prüfungsangst.",
      icon: Smile,
      color: "emerald",
    },
    {
      title: "Mehr Freizeit",
      description:
        "Optimiere deine Lernzeit und genieße mehr Freizeit mit Freunden und Familie.",
      icon: Clock,
      color: "indigo",
    },
  ];

  return (
    <section className="container py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Deine Vorteile
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${benefit.color}-100`}
                >
                  <Icon className={`h-6 w-6 text-${benefit.color}-500`} />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Jakob G.",
      role: "Schüler, 10. Klasse",
      content:
        "Ich bin schon seit der Beta begeisterter Nutzer und sehr gespannt, was noch kommen wird.",
      avatar: "JG",
      color: "orange",
    },
    {
      name: "Johannes S.",
      role: "Entwickler, Schüler 10. Klasse",
      content:
        "Ich habe Student-App entwickelt, um meine eigene Schulorganisation zu verbessern. Ich hoffe, dass auch andere Schüler davon profitieren.",
      avatar: "JS",
      color: "indigo",
    },
  ];

  return (
    <section className="container relative py-24">
      <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Was unsere Nutzer sagen
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Erfahre, wie Student-App anderen Schülern bereits dabei hilft, ihren
        Schulalltag zu meistern
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-${testimonial.color}-100 text-lg font-semibold text-${testimonial.color}-500`}
              >
                {testimonial.avatar}
              </div>
              <div>
                <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic text-muted-foreground">
                &quot;{testimonial.content}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Kostenlos während der Beta-Phase
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Student-App befindet sich derzeit in der öffentlichen Beta-Phase und
          ist komplett kostenlos nutzbar. Sei dabei und gestalte die Zukunft des
          digitalen Lernens mit!
        </p>
        <Button size="lg" asChild>
          <Link href="/login">Jetzt kostenlos testen</Link>
        </Button>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Für welche Schulformen ist Student-App geeignet?",
      answer:
        "Student-App ist für alle weiterführenden Schulen konzipiert, einschließlich Gymnasien, Realschulen, Gesamtschulen und Berufsschulen.",
    },
    {
      question: "Welche Notensysteme werden unterstützt?",
      answer:
        "Aktuell unterstützen wir das deutsche Notensystem (1-6) sowie das österreichische Notensystem (1-5). In Kürze werden wir auch das Schweizer Notensystem für Gymnasien und das deutsche 15-Punkte-System integrieren.",
    },
    {
      question: "Werden Ferienzeiten berücksichtigt?",
      answer:
        "Ja, wir unterstützen die Ferienkalender aller deutschen Bundesländer sowie Österreich.",
    },
    {
      question: "Kann ich Student-App auf mehreren Geräten nutzen?",
      answer:
        "Ja, du kannst dich mit deinem Konto auf verschiedenen Geräten anmelden und hast überall Zugriff auf deine Daten.",
    },
    {
      question: "Gibt es eine mobile App?",
      answer:
        "Student-App ist eine Progressive Web App (PWA), die du auf deinem Smartphone wie eine native App installieren und nutzen kannst. Sie funktioniert auf allen modernen Smartphones und Tablets. Um die App zu installieren, öffne Student-App in deinem Browser und tippe auf 'Zum Startbildschirm hinzufügen' (iOS) oder 'Installieren' (Android).",
    },
    {
      question: "Was bedeutet Public Beta?",
      answer:
        "Die Public Beta Phase bedeutet, dass Student-App bereits voll funktionsfähig ist, aber noch weiterentwickelt wird. Manchmal ist mit Abstürzen zu rechnen, dann einfach die Web-App schließen und erneut öffnen, auch die Performance kann manchmal etwas langsam sein. Daran wird noch gearbeitet. Du kannst die App kostenlos nutzen und durch dein Feedback zur Verbesserung beitragen. Neue Features werden regelmäßig hinzugefügt.",
    },
    {
      question: "Kann ich mit anderen Schülern zusammenarbeiten?",
      answer:
        "Aktuell ist Student-App auf die individuelle Nutzung ausgerichtet. Kollaborative Funktionen sind für zukünftige Updates geplant.",
    },
  ];

  return (
    <section className="container py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Häufig gestellte Fragen
      </h2>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Bereit, deine Schulleistung zu verbessern?
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Starte jetzt mit Student-App und erlebe, wie einfach digitales Lernen
          und Organisieren sein kann.
        </p>
        <Button size="lg" asChild>
          <Link href="/login">Kostenlos registrieren</Link>
        </Button>
      </div>
    </section>
  );
}
