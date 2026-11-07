"use client";

import { lazy, Suspense, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ClipboardList, CloudUpload, Code2, Sparkles, UsersRound, type LucideIcon } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { cn } from "../lib/utils";
import overviewScreen from "../../final-ui/overview.png";

const IsometricCubes = lazy(() =>
  import("./ui/background-cubes-grid").then(({ IsometricCubes }) => ({ default: IsometricCubes })),
);

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

function FeaturePill({
  icon: Icon,
  children,
  tone = "purple",
  delay = 0.2,
}: {
  icon: LucideIcon;
  children: ReactNode;
  tone?: "purple" | "lime";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const iconTone = tone === "lime" ? "bg-[#a8e62e] text-[#263600]" : "bg-[#7665ff] text-white";

  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 7, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT, delay }}
      className="feature-pill mx-[0.06em] inline-flex translate-y-[-0.06em] items-center gap-[0.28em] rounded-full border border-[#e9e9e5] bg-white py-[0.08em] pr-[0.42em] pl-[0.1em] align-middle leading-none text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
    >
      <span className={`inline-flex size-[0.92em] shrink-0 items-center justify-center rounded-full ${iconTone}`}>
        <Icon className="size-[0.5em]" aria-hidden="true" strokeWidth={2.5} />
      </span>
      {children}
    </motion.span>
  );
}

export default function BackgroundCubesGridDemo() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(7px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE_OUT, delay },
  });

  return (
    <section
      id="hero"
      aria-labelledby="campuscode-hero-heading"
      className="cube-hero relative isolate flex min-h-[50rem] w-full items-start justify-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <Suspense fallback={null}>
        <IsometricCubes
          className="-z-10"
          topColor="#f7f7f4"
          leftColor="#edede8"
          rightColor="#e5e5df"
          glowColor="#7665ff"
          glow={0.40}
          idleRipples={false}
        />
      </Suspense>
      <div className="cube-hero-content relative z-10 pointer-events-none mx-auto flex max-w-[1200px] flex-col items-center text-center antialiased">
        <motion.h1
          id="campuscode-hero-heading"
          {...fadeUp(0.12)}
          className={cn("max-w-[1200px] text-[clamp(31px,4.35vw,58px)] leading-[1.16] font-semibold tracking-[-0.055em] text-balance text-[#111]")}
        >
          Run your entire <FeaturePill icon={Code2} delay={0.12}>hackathon</FeaturePill>,
          <br />
          <FeaturePill icon={ClipboardList} delay={0.2}>Registrations</FeaturePill>,{" "}
          <FeaturePill icon={UsersRound} tone="lime" delay={0.28}>Team Formation</FeaturePill>,
          <br />
          <FeaturePill icon={CloudUpload} delay={0.36}>Submissions</FeaturePill>,{" "}
          <FeaturePill icon={Sparkles} delay={0.44}>AI Judging</FeaturePill> — all in one place.
        </motion.h1>
        <motion.p
          {...fadeUp(0.48)}
          className="mt-7 max-w-[650px] text-[clamp(15px,1.35vw,18px)] leading-[1.65] text-pretty text-neutral-500"
        >
          One platform for colleges to run hackathons and for students to discover, compete and build — powered by AI.
        </motion.p>
        <motion.div
          {...fadeUp(0.62)}
          className="pointer-events-auto mt-6 flex flex-row flex-wrap items-center justify-center gap-2"
        >
          <MagneticButton>
            <a href="#featured-events" className="button button-dark">
              Explore Hackathons <span aria-hidden="true">→</span>
            </a>
          </MagneticButton>
          <a
            href="#students"
            className="button button-outline"
          >
            See How It Works
          </a>
        </motion.div>
        <div className="hero-dashboard-preview" aria-label="CampusCode student dashboard preview">
          <div className="dashboard-preview-bar">
            <span className="dashboard-dots"><i></i><i></i><i></i></span>
            <span>CAMPUSCODE / STUDENT WORKSPACE</span>
            <span className="dashboard-preview-callout">PRODUCT PREVIEW</span>
          </div>
          <div className="dashboard-preview-body"><img className="dashboard-preview-shot" src={overviewScreen} alt="CampusCode dashboard with student activity, deadlines, communications and personalised events." loading="eager" /></div>
        </div>
      </div>
    </section>
  );
}
