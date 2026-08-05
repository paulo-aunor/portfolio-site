import { useEffect, useRef, useState } from "react";
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
  Github,
  Globe,
  Inbox,
  Linkedin,
  Lock,
  Mail,
  Menu,
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
const GITHUB_URL = "https://github.com/paulo-aunor";

type NavItem = { id: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "work", label: "What I build" },
  { id: "case-study", label: "Case study" },
  { id: "projects", label: "Projects" },
  { id: "blueprint", label: "The Blueprint" },
  { id: "contact", label: "Contact" },
];

/* ---------- hooks ---------- */

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibility = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility.set(id, entry.intersectionRatio);
          }
          let bestId = ids[0] ?? "";
          let bestRatio = -1;
          for (const [candidateId, ratio] of visibility) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = candidateId;
            }
          }
          if (bestRatio > 0) setActive(bestId);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [ids]);

  return active;
}

function useCursorSpotlight() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none)");
    if (mql.matches || touch.matches) return;

    document.body.classList.add("cursor-spotlight");
    const onMove = (e: PointerEvent) => {
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("cursor-spotlight");
    };
  }, []);
}

function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------- shared pieces ---------- */

function Kicker({ number, children }: { number: string; children: string }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-term">
      <span aria-hidden="true">&gt; {number}. </span>
      {children}
    </p>
  );
}

type FlowStep = { icon: LucideIcon; label: string };

function FlowDiagram({
  steps,
  stacked = false,
}: {
  steps: FlowStep[];
  stacked?: boolean;
}) {
  const rowClass = stacked ? "" : "sm:flex-row sm:items-stretch";
  const itemClass = stacked ? "" : "sm:flex-1 sm:items-stretch";
  const nodeClass = stacked
    ? ""
    : "sm:flex-col sm:justify-center sm:gap-3 sm:py-6 sm:text-center";
  const downArrowClass = stacked ? "" : "sm:hidden";
  const rightArrowClass = stacked ? "hidden" : "hidden sm:block";

  return (
    <ol className={`flex flex-col gap-2 ${rowClass}`}>
      {steps.map((step, i) => (
        <li key={step.label} className={`flex items-center gap-2 ${itemClass}`}>
          <div
            className={`flex flex-1 items-center gap-4 rounded-[10px] border border-border bg-surface px-4 py-4 ${nodeClass}`}
          >
            <step.icon
              size={22}
              className="shrink-0 text-term"
              aria-hidden="true"
            />
            <span className="text-sm leading-snug text-fg-muted">
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              className="flex shrink-0 items-center justify-center text-border"
              aria-hidden="true"
            >
              <ArrowDown size={18} className={downArrowClass} />
              <ArrowRight size={18} className={rightArrowClass} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ---------- sidebar shell ---------- */

const SOCIALS = [
  { href: GITHUB_URL, icon: Github, label: "GitHub" },
  { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
];

function Sidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <aside
      aria-label="About Paulo"
      className="flex h-full flex-col justify-between lg:sticky lg:top-0 lg:max-h-screen lg:py-24"
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-fg-strong md:text-5xl">
          <a href="#about" className="hover:text-accent transition-colors">
            Paulo Aunor
          </a>
        </h1>
        <p className="mt-3 text-lg font-medium text-fg-strong">
          Software Developer &amp; AI Automation Specialist
        </p>
        <p className="mt-2 max-w-xs text-sm text-fg-muted">
          Building software and AI that shorten the path from visitor to paying
          customer. Based in Kitchener-Waterloo.
        </p>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
          &gt; currently
        </p>
        <p className="mt-1 text-sm text-fg-muted">
          Flat-fee audits and AI-automation builds for small businesses.
        </p>

        <nav aria-label="Section" className="mt-12 hidden lg:block">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-4 py-1"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-[240ms] ease-out ${
                        isActive
                          ? "w-10 bg-term"
                          : "w-6 bg-border group-hover:w-10 group-hover:bg-term"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                        isActive
                          ? "text-fg-strong"
                          : "text-fg-subtle group-hover:text-fg-strong"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="mt-12 flex items-center gap-5 lg:mt-0">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              className="block text-fg-muted transition-colors hover:text-fg-strong"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <s.icon size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ---------- mobile top nav ---------- */

function MobileNav({ active }: { active: string }) {
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
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur lg:hidden">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4"
      >
        <a href="#about" className="text-sm font-semibold text-fg-strong">
          Paulo Aunor
        </a>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-fg-strong"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-surface px-4 py-3">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`block rounded-md px-3 py-3 font-mono text-[11px] uppercase tracking-[0.15em] ${
                    active === l.id ? "text-term" : "text-fg-muted"
                  } hover:bg-surface-2 hover:text-fg-strong`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                className="block rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-on-accent"
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

/* ---------- sections ---------- */

const REASSURANCES = [
  { icon: ShieldCheck, text: "Nothing ships without your review" },
  { icon: Lock, text: "Your data stays in your tools" },
  { icon: Receipt, text: "Flat fee, quoted upfront" },
];

function About() {
  return (
    <section id="about" data-reveal className="pt-8 lg:pt-24">
      <Kicker number="01">About</Kicker>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-fg-strong md:text-4xl">
        Software and AI that turn more visitors into customers.
      </h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
        <p>
          I design and build web apps, AI agents, and automation that shorten
          the path from visitor to paying customer. Before I wrote a line of
          code, I spent seven years on the operator side of POS and ERP. I know
          where deals get lost.
        </p>
        <p>
          Most of my clients are not technical. They run a shop, a clinic, a
          practice. What they hire me for is making the automation land in their
          tools and{" "}
          <span className="text-fg-strong">keep running</span>, not just demo
          well.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hi"
        >
          Start with an audit
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a
          href="#case-study"
          className="inline-flex items-center rounded-lg border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-sub"
        >
          See shipped work
        </a>
      </div>

      <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        {REASSURANCES.map((r) => (
          <li
            key={r.text}
            className="flex items-center gap-1.5 text-xs text-fg-subtle"
          >
            <r.icon size={14} className="shrink-0" aria-hidden="true" />
            {r.text}
          </li>
        ))}
      </ul>

      <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
        {[
          { value: "7 years", label: "on the operator side of POS and ERP" },
          {
            value: "Full-stack + AI",
            label: "React, Node, TypeScript, and LLM integrations",
          },
          { value: "Audit first", label: "flat-fee engagements, never hourly" },
        ].map((s) => (
          <div key={s.value} className="flex flex-col bg-surface p-5">
            <dt className="order-last mt-1 text-xs text-fg-muted">{s.label}</dt>
            <dd className="font-mono text-lg font-medium tabular-nums text-term">
              {s.value}
            </dd>
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
  {
    icon: Wrench,
    title: "Ops systems that finally talk",
    body: "Your POS, inventory, accounting, and payroll live in separate SaaS tools, so someone rebuilds the same reports every week by hand. I stitch them together with a custom internal tool and let AI handle the judgment calls (returns vs refunds, misclassified line items, edge cases the rules can't catch). Your ops team spends the time on decisions, not data entry.",
    steps: [
      { icon: Database, label: "Systems don't talk" },
      { icon: Wrench, label: "Custom pull job runs" },
      { icon: Bot, label: "AI classifies edge cases" },
      { icon: ClipboardList, label: "Clean report to ops" },
    ],
  },
];

function Work() {
  return (
    <section id="work" data-reveal className="mt-24 lg:mt-32">
      <Kicker number="02">What I build</Kicker>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg-strong md:text-3xl">
        Which one is yours?
      </h2>

      <div className="mt-10 flex flex-col gap-6">
        {WORKFLOWS.map((w) => (
          <article
            key={w.title}
            className="group relative overflow-hidden rounded-[10px] border border-border bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-term opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-term-sub">
                <w.icon size={22} className="text-term" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-fg-strong">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {w.body}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <FlowDiagram steps={w.steps} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-study" data-reveal className="mt-24 lg:mt-32">
      <Kicker number="03">Case study</Kicker>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg-strong md:text-3xl">
        90 minutes a day, gone.
      </h2>
      <p className="mt-2 text-sm text-fg-muted">
        In production since June 2026. One shipped example. The pattern (AI
        drafts, a human approves) applies wherever your team repeats the same
        judgment call.
      </p>

      <div className="mt-8">
        <FlowDiagram
          steps={[
            { icon: Inbox, label: "Mail arrives" },
            { icon: Bot, label: "Claude reads via MCP" },
            { icon: PenLine, label: "Draft saved" },
            { icon: UserCheck, label: "She reviews + sends" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-fg-muted">
        <p>
          <strong className="font-semibold text-fg-strong">The problem.</strong>{" "}
          A small business owner was spending about 90 minutes a day triaging
          one inbox: vendor messages, customer questions, internal updates.
          Off-the-shelf tools meant retraining, a brittle Zapier flow, or moving
          her mail into someone else's tenant.
        </p>
        <p>
          <strong className="font-semibold text-fg-strong">
            What I built.
          </strong>{" "}
          An MCP server connecting Claude Desktop directly to her IMAP mailbox.
          Claude reads folders, searches threads, and writes draft replies into
          her Drafts folder. It never sends. She reviews, edits, and hits send.
          Her email never leaves her own server.
        </p>
        <p>
          <strong className="font-semibold text-fg-strong">
            How it shipped.
          </strong>{" "}
          The build was not the hard part. Getting Python, credentials,
          certificates, and Claude Desktop config to line up on her Mac without
          me on a call took longer than the tool itself. I shipped a custom
          macOS installer she ran herself.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-[10px] border border-border bg-surface p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
            Result
          </p>
          <p className="mt-3 font-mono text-3xl font-medium tabular-nums text-term">
            83% less time
          </p>
          <div className="mt-5 space-y-3">
            <div>
              <div className="flex items-baseline justify-between text-xs text-fg-muted">
                <span>Before</span>
                <span className="font-mono tabular-nums">90 min/day</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-fg-subtle"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between text-xs text-fg-muted">
                <span>After</span>
                <span className="font-mono tabular-nums text-fg-strong">
                  15 min/day
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-term"
                  style={{ width: "17%" }}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-fg-muted">
            Two weeks in and still running. No retraining required.
          </p>
        </div>
        <div className="rounded-[10px] border border-border bg-surface p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
            Stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              "Python",
              "Anthropic MCP",
              "IMAP",
              "Claude Desktop",
              "Custom macOS installer",
            ].map((t) => (
              <li
                key={t}
                className="rounded-lg bg-term-sub px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-term"
              >
                {t}
              </li>
            ))}
          </ul>
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

type Project = {
  title: string;
  tagline: string;
  body: string;
  image: string;
  imageAlt: string;
  imageAspect: "landscape" | "portrait";
  tech: string[];
  href?: string;
  hrefLabel?: string;
  status?: string;
};

const PROJECTS: Project[] = [
  {
    title: "TetherPOS",
    tagline: "Offline-first POS for retail and restaurants.",
    body: "Built for shops where the internet drops out mid-shift. Menu, inventory, and sales reports run entirely on-device via IndexedDB. Excel import for menu/inventory setup.",
    image: `${import.meta.env.BASE_URL}projects/tetherpos-cart.png`,
    imageAlt: "TetherPOS point-of-sale screen with menu items and populated cart",
    imageAspect: "landscape",
    tech: ["React", "Vite", "Dexie.js", "JavaScript"],
    href: "https://github.com/paulo-aunor/tetherpos",
    hrefLabel: "Repo",
  },
  {
    title: "Docket Vein",
    tagline: "Personal CRM for freelance leads, inbound and outbound.",
    body: "Pulls job posts from r/forhire and outbound local-business leads from Google Places. Scores each against an ICP profile via Gemini 2.5 Flash and drafts cold outreach in your voice. Runs entirely on your machine.",
    image: `${import.meta.env.BASE_URL}projects/docket-vein-picks.png`,
    imageAlt: "Docket Vein Daily Picks view showing AI-scored leads with reasoning",
    imageAspect: "landscape",
    tech: ["React", "Node", "Express", "SQLite", "Python", "Gemini"],
    status: "Private repo",
  },
  {
    title: "Record Routes",
    tagline: "Delivery checklist for the Waterloo Region Record paper route.",
    body: "Pick tonight's routes, get an ordered checklist of stops, tap an address for turn-by-turn in Google Maps. State survives app kills and phone reboots. Screen stays awake through the shift.",
    image: `${import.meta.env.BASE_URL}projects/record-routes-home.png`,
    imageAlt: "Record Routes home screen with three delivery routes selected",
    imageAspect: "portrait",
    tech: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    href: "https://github.com/paulo-aunor/record-routes",
    hrefLabel: "Repo",
  },
];

function Projects() {
  return (
    <section id="projects" data-reveal className="mt-24 lg:mt-32">
      <Kicker number="04">Projects</Kicker>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg-strong md:text-3xl">
        Things I've shipped for myself.
      </h2>
      <p className="mt-3 max-w-xl text-sm text-fg-muted">
        Not client work. Personal tools I built because I needed them,
        kept using them, and could hand them to someone else tomorrow.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-[10px] border border-border bg-surface transition-colors hover:bg-surface-2"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-px bg-term opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <div
              className={`w-full overflow-hidden border-b border-border bg-bg ${
                p.imageAspect === "portrait"
                  ? "flex items-center justify-center py-6"
                  : ""
              }`}
              style={
                p.imageAspect === "landscape"
                  ? { aspectRatio: "16 / 10" }
                  : undefined
              }
            >
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className={
                  p.imageAspect === "portrait"
                    ? "h-72 w-auto rounded-lg border border-border shadow-lg shadow-black/40"
                    : "h-full w-full object-cover object-top"
                }
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-fg-strong">
                  {p.title}
                </h3>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:text-accent-hi hover:underline"
                  >
                    {p.hrefLabel ?? "View"}
                    <ArrowRight size={12} aria-hidden="true" />
                  </a>
                ) : p.status ? (
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
                    {p.status}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-fg">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {p.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg bg-term-sub px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-term"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Blueprint() {
  return (
    <section id="blueprint" data-reveal className="mt-24 lg:mt-32">
      <Kicker number="05">The Blueprint</Kicker>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg-strong md:text-3xl">
        The Operator Blueprint
      </h2>
      <p className="mt-3 max-w-xl text-sm text-fg-muted">
        The same five steps, every project. Scoped, priced, and handed off the
        way an operator would want it done, built for small, deliberate work,
        not agency throughput.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FRAMEWORK.map((f, i) => (
          <article
            key={f.title}
            className="group relative overflow-hidden rounded-[10px] border border-border bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-term opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="absolute right-4 top-4 font-mono text-[11px] tracking-widest text-fg-subtle">
              0{i + 1}
            </span>
            <f.icon size={22} className="text-term" aria-hidden="true" />
            <h3 className="mt-4 text-base font-semibold text-fg-strong">
              {f.title}
            </h3>
            <ul className="mt-3 space-y-2.5">
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
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" data-reveal className="mt-24 lg:mt-32 lg:pb-24">
      <Kicker number="06">Contact</Kicker>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg-strong md:text-3xl">
        Where are you losing leads?
      </h2>
      <p className="mt-3 max-w-xl text-sm text-fg-muted">
        Start with one sentence about it. That is the quickest way for me to
        tell you whether it is a quick fix, a bigger build, or something else
        entirely.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}?subject=Start%20with%20an%20audit`}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hi"
        >
          <Mail size={16} aria-hidden="true" />
          Start with an audit
        </a>
        <a
          href={LINKEDIN_URL}
          className="inline-flex items-center rounded-lg border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-sub"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-6 font-mono text-sm text-fg-muted">{EMAIL}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-6 lg:mt-32">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-fg-subtle">
        <p>Paulo Aunor · Kitchener-Waterloo, Canada</p>
        <p className="font-mono tabular-nums">2026</p>
      </div>
    </footer>
  );
}

/* ---------- app ---------- */

export default function App() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  useCursorSpotlight();
  useRevealOnScroll();
  const mainRef = useRef<HTMLElement>(null);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-fg-strong"
      >
        Skip to content
      </a>
      <MobileNav active={active} />

      <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-12 md:py-16 lg:grid lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-16 lg:py-0">
        <Sidebar active={active} />
        <main ref={mainRef} className="lg:py-24">
          <About />
          <Work />
          <CaseStudy />
          <Projects />
          <Blueprint />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
