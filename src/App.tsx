import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  Calculator,
  ClipboardList,
  Database,
  FileText,
  Globe,
  Inbox,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Milestone,
  PenLine,
  Receipt,
  Send,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

const EMAIL = "ramonpaunor23@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/pauloaunordev/";

const NAV_LINKS = [
  { href: "#work", label: "What I build" },
  { href: "#case-study", label: "Case study" },
  { href: "#process", label: "The Blueprint" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-surface">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8"
      >
        <a href="#top" className="text-base font-semibold">
          Paulo Aunor
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition-opacity duration-150 hover:opacity-90"
          >
            Start with an audit
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-3 py-3 text-sm text-fg-muted hover:bg-bg hover:text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                className="block rounded-md bg-accent px-4 py-3 text-center text-sm font-medium text-on-accent"
                onClick={() => setOpen(false)}
              >
                Start with an audit
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

type FlowStep = { icon: LucideIcon; label: string };

/**
 * Conceptual step diagram, not a screenshot of a running product.
 * `stacked` forces a vertical layout regardless of viewport width — for
 * narrow contexts (grid cards) where a viewport breakpoint would go
 * horizontal while the container itself stays narrow.
 */
function FlowDiagram({ steps, stacked = false }: { steps: FlowStep[]; stacked?: boolean }) {
  const rowClass = stacked ? "" : "sm:flex-row sm:items-stretch";
  const itemClass = stacked ? "" : "sm:flex-1 sm:items-stretch";
  const nodeClass = stacked ? "" : "sm:flex-col sm:justify-center sm:gap-3 sm:py-6 sm:text-center";
  const downArrowClass = stacked ? "" : "sm:hidden";
  const rightArrowClass = stacked ? "hidden" : "hidden sm:block";

  return (
    <ol className={`flex flex-col gap-2 ${rowClass}`}>
      {steps.map((step, i) => (
        <li key={step.label} className={`flex items-center gap-2 ${itemClass}`}>
          <div className={`flex flex-1 items-center gap-4 rounded-lg border border-border bg-surface px-4 py-4 ${nodeClass}`}>
            <step.icon size={24} className="shrink-0 text-accent" aria-hidden="true" />
            <span className="text-sm leading-snug text-fg-muted">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <span className="flex shrink-0 items-center justify-center text-border" aria-hidden="true">
              <ArrowDown size={18} className={downArrowClass} />
              <ArrowRight size={18} className={rightArrowClass} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

const REASSURANCES = [
  { icon: ShieldCheck, text: "Nothing ships without your review" },
  { icon: Lock, text: "Your data stays in your tools" },
  { icon: Receipt, text: "Flat fee, quoted upfront" },
];

/** Compact, honest system diagram: not a screenshot, a shape. */
function HeroDiagram() {
  return (
    <div className="rounded-xl border border-border bg-surface p-8">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-fg-muted">
        The shape of it
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        {[Globe, MessageSquare, UserPlus].map((Icon, i) => (
          <div
            key={i}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-bg"
          >
            <Icon size={24} className="text-fg-muted" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="my-4 flex justify-center text-border" aria-hidden="true">
        <ArrowDown size={20} />
      </div>
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-subtle">
          <Bot size={36} className="text-accent" aria-hidden="true" />
        </div>
      </div>
      <div className="my-4 flex justify-center text-border" aria-hidden="true">
        <ArrowDown size={20} />
      </div>
      <div className="flex items-center justify-center gap-2.5 rounded-lg border border-border bg-bg px-4 py-3.5">
        <UserCheck size={20} className="text-accent shrink-0" aria-hidden="true" />
        <span className="text-sm text-fg-muted">You approve every step</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-44 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:items-center lg:gap-12">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-fg-muted">
            Software Developer · AI Automation Specialist · Kitchener-Waterloo
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Software and AI that turn more visitors into customers.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
            I design and build web apps, AI agents, and automation that
            shorten the path from visitor to paying customer. Before I wrote
            a line of code, I spent seven years on the operator side of POS
            and ERP. I know where deals get lost.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-opacity duration-150 hover:opacity-90"
            >
              Start with an audit
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#case-study"
              className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors duration-150 hover:border-fg-muted"
            >
              See shipped work
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            {REASSURANCES.map((r) => (
              <li key={r.text} className="flex items-center gap-1.5 text-xs text-fg-muted">
                <r.icon size={14} className="shrink-0" aria-hidden="true" />
                {r.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 hidden lg:block">
          <HeroDiagram />
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {[
          { value: "7 years", label: "on the operator side of POS and ERP" },
          { value: "Full-stack + AI", label: "React, Node, TypeScript, and LLM integrations" },
          { value: "Audit first", label: "flat-fee engagements, never hourly" },
        ].map((s) => (
          <div key={s.value} className="flex flex-col bg-surface p-6">
            <dt className="order-last mt-1 text-sm text-fg-muted">{s.label}</dt>
            <dd className="font-mono text-xl font-medium tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const WORKFLOWS: {
  icon: LucideIcon;
  title: string;
  body: string;
  steps: FlowStep[];
}[] = [
  {
    icon: UserPlus,
    title: "Lead qualification & routing",
    body: "Every inquiry scored the moment it lands, then routed to the right person in your CRM. Your team spends time on leads that are actually ready to buy.",
    steps: [
      { icon: UserPlus, label: "Inquiry submitted" },
      { icon: Bot, label: "AI scores fit" },
      { icon: Database, label: "Lands in CRM" },
      { icon: Bell, label: "Hot leads pinged" },
    ],
  },
  {
    icon: Globe,
    title: "Conversion-focused web builds",
    body: "Websites and web apps built to qualify visitors while they browse: smart forms, AI chat that answers real questions, pages that adapt to what someone's looking for. Fewer drop-offs before anyone reaches out.",
    steps: [
      { icon: Globe, label: "Visitor arrives" },
      { icon: Bot, label: "AI engages + qualifies" },
      { icon: UserCheck, label: "Ready-to-buy lead" },
      { icon: Send, label: "Handed to sales" },
    ],
  },
  {
    icon: FileText,
    title: "Back-office automation",
    body: "Invoices, orders, and reports checked against your numbers by plain code, not a guess. Every discrepancy flagged with the reason.",
    steps: [
      { icon: FileText, label: "Invoice arrives" },
      { icon: Bot, label: "AI extracts line items" },
      { icon: Calculator, label: "Code checks the math" },
      { icon: AlertTriangle, label: "Flagged if off" },
    ],
  },
];

function Work() {
  return (
    <section id="work" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Which one is yours?
        </h2>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Most of my clients are not technical. They run a shop, a clinic, a
          practice. What they hire me for is making the automation land in their
          tools and keep running, not just demo well.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {WORKFLOWS.map((w) => (
            <article key={w.title} className="rounded-xl border border-border bg-bg p-6">
              <w.icon size={24} className="text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{w.body}</p>
              <div className="mt-5">
                <FlowDiagram steps={w.steps} stacked />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-study" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-fg-muted">
        Case study · in production since June 2026
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        90 minutes a day, gone.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-fg-muted">
        One shipped example. The pattern (AI drafts, a human approves) applies
        wherever your team repeats the same judgment call: lead follow-up,
        invoice checks, inbox triage.
      </p>

      <div className="mt-10 max-w-3xl">
        <FlowDiagram
          steps={[
            { icon: Inbox, label: "Mail arrives" },
            { icon: Bot, label: "Claude reads via MCP" },
            { icon: PenLine, label: "Draft saved" },
            { icon: UserCheck, label: "She reviews + sends" },
          ]}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-fg-muted">
          <p>
            <strong className="font-semibold text-fg">The problem.</strong> A small
            business owner was spending about 90 minutes a day triaging one inbox:
            vendor messages, customer questions, internal updates. Off-the-shelf
            tools meant retraining, a brittle Zapier flow, or moving her mail into
            someone else's tenant.
          </p>
          <p>
            <strong className="font-semibold text-fg">What I built.</strong> An MCP
            server connecting Claude Desktop directly to her IMAP mailbox. Claude
            reads folders, searches threads, and writes draft replies into her
            Drafts folder. It never sends. She reviews, edits, and hits send. Her
            email never leaves her own server.
          </p>
          <p>
            <strong className="font-semibold text-fg">How it shipped.</strong> The
            build was not the hard part. Getting Python, credentials, certificates,
            and Claude Desktop config to line up on her Mac without me on a call
            took longer than the tool itself. I shipped a custom macOS installer
            she ran herself.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
              Result
            </h3>
            <p className="mt-3 font-mono text-3xl font-medium tabular-nums">83% less time</p>
            <div className="mt-5 space-y-3">
              <div>
                <div className="flex items-baseline justify-between text-xs text-fg-muted">
                  <span>Before</span>
                  <span className="font-mono tabular-nums">90 min/day</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg">
                  <div className="h-full rounded-full bg-border" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-xs text-fg-muted">
                  <span>After</span>
                  <span className="font-mono tabular-nums text-fg">15 min/day</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg">
                  <div className="h-full rounded-full bg-accent" style={{ width: "17%" }} />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-fg-muted">
              Two weeks in and still running. No retraining required.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
              Stack
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Python", "Anthropic MCP", "IMAP", "Claude Desktop", "Custom macOS installer"].map(
                (t) => (
                  <li
                    key={t}
                    className="rounded-md bg-accent-subtle px-3 py-1.5 font-mono text-xs text-fg"
                  >
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const FRAMEWORK: {
  icon: LucideIcon;
  title: string;
  points: { label: string; body: string }[];
}[] = [
  {
    icon: ClipboardList,
    title: "Scope & Strategy",
    points: [
      {
        label: "Mapped, not guessed.",
        body: "A flat-fee audit ($500-800 CAD) reviews your workflow and ranks the fixes worth building, each with an hours-saved estimate.",
      },
      {
        label: "Priced before you commit.",
        body: "You get a written brief and a locked price before any build work starts.",
      },
    ],
  },
  {
    icon: Wrench,
    title: "Right-Fit Build",
    points: [
      {
        label: "The plainest tool that works.",
        body: "Self-hosted automation, plain code, or a full web app, whichever actually solves the problem. Never a trendy stack for its own sake.",
      },
      {
        label: "AI where it earns its place.",
        body: "AI handles the judgment calls. Deterministic code checks anything involving math or rules.",
      },
    ],
  },
  {
    icon: Receipt,
    title: "Transparent Agreement",
    points: [
      {
        label: "One price, locked in writing.",
        body: "Half up front, half on delivery. If a build runs long, that is on me, not your invoice.",
      },
      {
        label: "You own what you pay for.",
        body: "Source files, credentials, and documentation, handed over at the end. No exceptions.",
      },
    ],
  },
  {
    icon: Milestone,
    title: "Milestone Check-In",
    points: [
      {
        label: "You see it before it is done.",
        body: "For anything bigger than a quick fix, you get a working version partway through, not just on launch day.",
      },
      {
        label: "Updates as it happens.",
        body: "Short async updates as the build progresses. No black box until the end.",
      },
    ],
  },
  {
    icon: BookOpen,
    title: "Testing & Handover",
    points: [
      {
        label: "Tested on real data.",
        body: "Every build runs against real data before you see it, not just a happy-path demo.",
      },
      {
        label: "Full handover, nothing held back.",
        body: "A Loom walkthrough, a one-page operator doc, and 30 days of fixes included. It keeps running after I am gone.",
      },
    ],
  },
];

function Process() {
  return (
    <section id="process" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-fg-muted">
          The framework
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          The Operator Blueprint
        </h2>
        <p className="mt-3 max-w-2xl text-fg-muted">
          The same five steps, every project. Scoped, priced, and handed off
          the way an operator would want it done, and built for small,
          deliberate work, not agency throughput.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FRAMEWORK.map((f, i) => (
            <article
              key={f.title}
              className="relative rounded-xl border border-border bg-bg p-6"
            >
              <span className="absolute right-5 top-5 font-mono text-xs text-fg-muted opacity-50">
                0{i + 1}
              </span>
              <f.icon size={24} className="text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <ul className="mt-3 space-y-3">
                {f.points.map((pt) => (
                  <li key={pt.label} className="text-sm leading-relaxed">
                    <span className="font-medium text-fg">{pt.label}</span>{" "}
                    <span className="text-fg-muted">{pt.body}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Where are you losing leads?
        </h2>
        <p className="mt-4 text-fg-muted">
          Start with one sentence about it. That is the quickest way for me to
          tell you whether it is a quick fix, a bigger build, or something
          else entirely.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}?subject=Start%20with%20an%20audit`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-opacity duration-150 hover:opacity-90"
          >
            <Mail size={16} aria-hidden="true" />
            Start with an audit
          </a>
          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors duration-150 hover:border-fg-muted"
            >
              LinkedIn
            </a>
          )}
        </div>
        <p className="mt-6 font-mono text-sm text-fg-muted">{EMAIL}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-8 text-sm text-fg-muted md:px-6 lg:px-8">
        <p>Paulo Aunor · Kitchener-Waterloo, Canada</p>
        <p>2026</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <CaseStudy />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
