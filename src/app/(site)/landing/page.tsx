import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartNoAxesGantt,
  Check,
  Clock,
  GalleryVerticalEnd,
  Goal,
  Smile,
} from "lucide-react";
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
            Jetzt verfügbar!
          </Badge>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Deine Schulzeit, <span className="text-indigo-500">perfekt</span>{" "}
            organisiert
          </h1>

          <h2 className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Plane deinen Stundenplan, tracke deine Noten und vergiss nie wieder
            eine Prüfung oder Hausaufgabe - alles in einer App.
          </h2>

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
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="https://ygokgtgl7r.ufs.sh/f/UZ4yvln5I9S5fvVgYVJ7YXwUdxpIk90Ka8oNFGW2Dj5hArBV"
              alt="Studentapp auf iPhone und iPad"
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
      title: "Fächer",
      description:
        "Organisiere deine Fächer übersichtlich, damit du alles Wichtige immer griffbereit hast.",
      image:
        "https://ygokgtgl7r.ufs.sh/f/UZ4yvln5I9S505vMY1G2IlcvhrjQdFX0UkZtYwH6x9opmSsD",
    },
    {
      title: "Prüfungen",
      description:
        "Plane deine Tests und Klausuren, tracke deine Noten und behalte deine Ziele im Blick.",
      image:
        "https://ygokgtgl7r.ufs.sh/f/UZ4yvln5I9S51yrcXFquXPH0mjOyn78abUdv94Z3lwCJxeRT",
    },
    {
      title: "Hausaufgaben",
      description:
        "Trage deine Hausaufgaben ein und vergiss nie wieder eine Abgabe – einfach und stressfrei.",
      image:
        "https://ygokgtgl7r.ufs.sh/f/UZ4yvln5I9S5V5i0FLuQ6P3E2zgFTukCjNGOtqW8U5bhIwyD",
    },
    {
      title: "Stundenplan",
      description:
        "Erstelle und verwalte deinen Stundenplan, damit du immer weißt, was als Nächstes ansteht.",
      image:
        "https://ygokgtgl7r.ufs.sh/f/UZ4yvln5I9S5IplF0AwLqvXCDgkZlWrsOKpz5w8QEY9PMnG6",
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
      title: "Besserer Überblick",
      description:
        "Behalte Hausaufgaben, Prüfungen und Noten jederzeit im Blick.",
      icon: ChartNoAxesGantt,
      color: "sky",
    },
    {
      title: "Weniger Stress",
      description: "Organisiere deinen Schulalltag, ohne dich zu überfordern.",
      icon: Smile,
      color: "emerald",
    },
    {
      title: "Mehr Zeit",
      description:
        "Plane alles an einem Ort und spare dir das Suchen und Nachdenken.",
      icon: Clock,
      color: "indigo",
    },
    {
      title: "Bessere Noten",
      description:
        "Verpasse keine Abgaben oder Prüfungen und sei immer gut vorbereitet.",
      icon: Goal,
      color: "amber",
    },
    {
      title: "Einfach starten",
      description:
        "Keine komplizierten Funktionen – die App ist leicht und schnell zu nutzen.",
      icon: TrendingUp,
      color: "sky",
    },
    {
      title: "Alles dabei",
      description:
        "Egal ob Stundenplan, Hausaufgaben oder Noten – du hast alles in einer App.",
      icon: GalleryVerticalEnd,
      color: "rose",
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
        "Ich habe Studentapp entwickelt, um meine eigene Schulorganisation zu verbessern. Ich hoffe, dass auch andere Schüler davon profitieren.",
      avatar: "JS",
      color: "indigo",
    },
  ];

  return (
    <section className="container relative py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Was andere Schüler sagen
      </h2>

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
          Alles drin – und das kostenlos
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Nutze alle Features der App ohne Einschränkungen, komplett kostenlos.
          Unterstütze die Weiterentwicklung mit einem einmaligen Betrag und
          zeig, dass dir die App wichtig ist.
        </p>
      </div>

      <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="relative max-w-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">Kostenlos</CardTitle>
            <div className="mt-4 text-4xl font-bold">0€</div>
            <p className="text-sm text-muted-foreground">Für immer kostenlos</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Alle Funktionen der App</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Keine Werbung</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Für immer kostenlos</span>
              </div>
            </div>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/login">Kostenlos starten</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="relative max-w-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">Supporter</CardTitle>

            <div className="mt-4 text-4xl font-bold">30€</div>
            <p className="text-sm text-muted-foreground">Einmalig</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Alle Funktionen der App</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Keine Werbung</span>
              </div>
              <div className="flex hidden items-center gap-2">
                {/*HIDDEN UNTIL WE HAVE A EXCLUSIVE FEATURE*/}
                <Check className="h-5 w-5 text-indigo-500" />
                <span>Ein zusätzliches, exklusives Feature</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-indigo-500" />
                <span>
                  Unterstütze die Entwicklung und bleib Teil der Community
                </span>
              </div>
            </div>
            <Button disabled size="lg" className="mt-4">
              Kommt bald
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Ist die App wirklich kostenlos?",
      answer:
        "Ja, die App ist komplett kostenlos und enthält alle Funktionen, die du brauchst. Es gibt keine versteckten Kosten oder Abos.",
    },
    {
      question: "Gibt es Werbung in der App?",
      answer:
        "Nein, keine nervige Werbung – höchstens ein kleiner Hinweis auf eine andere App, die dir ebenfalls nützlich sein könnte 😉.",
    },
    {
      question: "Warum gibt es einen Supporter-Plan?",
      answer:
        "Der Supporter-Plan hilft, die Kosten für den Betrieb der App zu decken. Wenn du es dir leisten kannst, kannst du mit deinem Beitrag dafür sorgen, dass die App weiterhin kostenlos für alle verfügbar bleibt.",
    },
    {
      question: "Für welche Schulformen ist Studentapp geeignet?",
      answer:
        "Studentapp ist für alle weiterführenden Schulen konzipiert, einschließlich Gymnasien, Realschulen, Gesamtschulen und Berufsschulen.",
    },
    {
      question: "Welche Notensysteme werden unterstützt?",
      answer:
        "Aktuell unterstützen wir das deutsche Notensystem (1-6) sowie das österreichische Notensystem (1-5). In Kürze werden wir auch das Schweizer Notensystem für Gymnasien und das deutsche 15-Punkte-System hinzufügen.",
    },
    {
      question: "Werden Ferienzeiten berücksichtigt?",
      answer:
        "Ja, wir unterstützen die Ferienkalender aller deutschen Bundesländer sowie Österreichs, bald auch Schweiz.",
    },
    {
      question: "Kann ich die App auf mehreren Geräten nutzen?",
      answer:
        "Ja, du kannst dich mit deinem Konto auf verschiedenen Geräten anmelden und hast überall Zugriff auf deine Daten.",
    },
    {
      question: "Gibt es eine mobile App?",
      answer:
        "Studentapp ist eine Progressive Web App (PWA), die du auf deinem Smartphone wie eine native App installieren und nutzen kannst. Sie funktioniert auf allen modernen Smartphones und Tablets. Um die App zu installieren, öffne Studentapp in deinem Browser und tippe auf 'Zum Startbildschirm hinzufügen' (iOS) oder 'Installieren' (Android).",
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
          Dein Schulalltag, einfach organisiert
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Starte jetzt mit Studentapp und bring Hausaufgaben, Prüfungen und
          Stundenplan unter Kontrolle.
        </p>
        <Button size="lg" asChild>
          <Link href="/login">Jetzt kostenlos starten</Link>
        </Button>
      </div>
    </section>
  );
}
