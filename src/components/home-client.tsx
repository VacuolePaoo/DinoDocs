"use client";

import Lenis from "lenis";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Aurora from "@/components/aurora";
import BlurText from "@/components/blur-text";
import { CopyMarkdownPanel } from "@/components/copy-markdown-panel";
import GradientASCII from "@/components/gradient-ascii";
import ScrambledText from "@/components/scrambled-text";
import cncebDinodocs from "@/images/cnceb-dinodocs.svg";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const introduction =
  "DinoDocs is a digital garden where ideas take root and knowledge grows over time. Explore technical notes, practical experiments, and product documentation—carefully collected, connected, and refined into something useful.";

const productEntries = [
  {
    title: "Moments",
    description: "Usage guide and development docs for Moments.",
    href: "/docs/moments",
  },
  {
    title: "Astro Cupertino",
    description: "Setup, configuration, and theme guide for Astro Cupertino.",
    href: "/docs/cupertino",
  },
  {
    title: "震动音乐",
    description: "Usage guide and development docs for 震动音乐.",
    href: "/docs/bandmusic",
  },
];

const noteEntries = [
  {
    title: "开发笔记",
    description: "Engineering notes and development records.",
    href: "/notes/dev",
  },
  {
    title: "高中资源",
    description: "Study resources collected over the years.",
    href: "/notes/study",
  },
];

const pageLinks = [
  { title: "Moments", href: "/docs/moments" },
  { title: "Astro Cupertino", href: "/docs/cupertino" },
  { title: "震动音乐", href: "/docs/bandmusic" },
  { title: "开发笔记", href: "/notes/dev" },
  { title: "高中资源", href: "/notes/study" },
  { title: "Docs", href: "/docs" },
];

export default function HomeClient({
  stats,
  builtAt,
  copyrightYear,
}: {
  stats: { products: number; collections: number; pages: number };
  builtAt: string;
  copyrightYear: string;
}) {
  const statItems = [
    { value: stats.products, label: "Products" },
    { value: stats.collections, label: "Notebooks" },
    { value: stats.pages, label: "Pages" },
  ];
  const storyRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [narrativeKey, setNarrativeKey] = useState(0);
  const [auroraVisible, setAuroraVisible] = useState(false);
  const [auroraKey, setAuroraKey] = useState(0);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const welcomeOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32],
    [1, 1, 0],
  );
  const welcomeY = useTransform(scrollYProgress, [0.12, 0.32], [0, -24]);
  const introductionOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.52],
    [0, 1],
  );
  const introductionY = useTransform(scrollYProgress, [0.3, 0.52], [24, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowIntroduction(latest >= 0.28);
  });

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0);
    setNarrativeKey((key) => key + 1);
  };

  useEffect(() => {
    const element = auroraRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setAuroraVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setAuroraKey((key) => key + 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const lenis = new Lenis({ autoRaf: true, duration: 0.9 });
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <main
      data-home-page
      className="relative isolate flex-1 bg-[#05070d] text-white"
    >
      <section ref={storyRef} className="relative z-10 h-[160svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0">
            <GradientASCII
              key={narrativeKey}
              colors={["#17255f", "#4169c1", "#9ac8ff", "#eef7ff"]}
              shape="horizon"
              characters=" =+xX0S8#@"
              cellSize={17}
              density={0.76}
              glyphOpacity={0.72}
              gradientOpacity={0.82}
              glow={0.3}
              depthOfField={0.08}
              flicker={0.16}
              softness={0.64}
              flow={0.6}
              speed={0.7}
              grain={0.055}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.16)_0%,transparent_32%,rgba(5,7,13,0.12)_62%,rgba(5,7,13,0.72)_100%)]"
            aria-hidden="true"
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6 pb-20 pt-40 sm:px-10"
            style={{ opacity: welcomeOpacity, y: welcomeY }}
            aria-hidden={showIntroduction}
          >
            <div className="flex w-full max-w-6xl translate-y-6 flex-col items-center text-center sm:translate-y-10">
              <BlurText
                key={narrativeKey}
                text="Welcome to DinoDocs"
                effect="focus"
                animateBy="letters"
                direction="top"
                staggerFrom="center"
                trigger="view"
                delay={20}
                stepDuration={0.5}
                blur={14}
                distance={0}
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
                loopDelay={1.6}
                focusOnHover
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
            style={{ opacity: introductionOpacity, y: introductionY }}
            aria-hidden={!showIntroduction}
          >
            {showIntroduction && (
              <ScrambledText
                className="scrambled-text-demo"
                effect="scramble"
                radius={100}
                strength={1}
                trail={0.6}
                duration={1.2}
                speed={0.5}
                scrambleChars="🦖🦕"
                clickBurst
                intro
              >
                {introduction}
              </ScrambledText>
            )}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-6 sm:px-10 sm:pt-8">
        <section>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {statItems.map((stat) => (
              <p key={stat.label} className="font-mono text-sm text-white/50">
                <span className="mr-1.5 text-lg font-semibold text-white">
                  {stat.value}
                </span>
                {stat.label}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-medium tracking-[-0.04em] text-white">
            Explore Products
          </h2>
          <ul className="mt-8 border-y border-white/10">
            {productEntries.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block py-5 transition-colors"
                >
                  <span className="block text-lg font-medium text-white transition-colors group-hover:text-blue-200">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white/50">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-medium tracking-[-0.04em] text-white">
            Read Notes
          </h2>
          <ul className="mt-8 border-y border-white/10">
            {noteEntries.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block py-5 transition-colors"
                >
                  <span className="block text-lg font-medium text-white transition-colors group-hover:text-blue-200">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white/50">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-medium tracking-[-0.04em] text-white">
            AI-Friendly
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-sm text-white">
                llms.txt · llms-full.txt
              </p>
              <p className="mt-1 text-sm text-white/50">
                AI entry points for every collection.
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 font-mono text-xs leading-6">
                {[
                  "/docs/moments/llms.txt",
                  "/docs/moments/llms-full.txt",
                  "/notes/dev/llms.txt",
                  "/notes/dev/llms-full.txt",
                ].map((path) => (
                  <p key={path}>
                    <span className="text-emerald-400">GET</span>{" "}
                    <a
                      href={path}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 underline-offset-4 transition-colors hover:text-fd-primary hover:underline"
                    >
                      {path}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-sm text-white">.md</p>
              <p className="mt-1 text-sm text-white/50">
                Append .md to any page URL for raw Markdown.
              </p>
              <div className="mt-4">
                <a
                  href="/docs/moments/getting-started.md"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-xs transition-colors hover:border-fd-primary/50"
                >
                  <span className="truncate text-white/50">
                    /docs/moments/getting-started
                  </span>
                  <span className="shrink-0 text-fd-primary">.md</span>
                </a>
              </div>
            </div>

            <CopyMarkdownPanel className="md:col-span-2" />
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto w-full max-w-3xl px-6 pt-8 sm:px-10">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-fd-primary"
          >
            Back to top
            <ArrowUp className="size-4" />
          </button>
        </div>

        <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-24 sm:px-10 sm:pt-48 sm:pb-32">
          <Image
            src={cncebDinodocs}
            alt="CNCEB Studio · DinoDocs"
            className="h-20 w-auto"
          />
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-white">Products</p>
              <ul className="mt-3 space-y-2 text-sm">
                {productEntries.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/50 transition-colors hover:text-fd-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Notes</p>
              <ul className="mt-3 space-y-2 text-sm">
                {noteEntries.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/50 transition-colors hover:text-fd-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-white">About</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/docs"
                    className="text-white/50 transition-colors hover:text-fd-primary"
                  >
                    Switch Docs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 space-y-1.5 text-sm font-medium text-white/40">
            <p>© {copyrightYear} CNCEB Studio. All rights reserved.</p>
            <p>
              Content licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-fd-primary"
              >
                CC BY-NC-SA 4.0
              </a>
            </p>
            <p>Built at {builtAt}</p>
          </div>
        </div>

        <div ref={auroraRef} className="relative h-56 w-full sm:h-72">
          {auroraVisible && (
            <Aurora
              key={auroraKey}
              colorStops={["#8fe3ff", "#e8f6ff", "#6f9bff"]}
              amplitude={0}
              blend={1}
              height={0.5}
              speed={1}
              glow={0}
              brightness={0.8}
              direction="bottom"
            />
          )}
        </div>
      </footer>
    </main>
  );
}
