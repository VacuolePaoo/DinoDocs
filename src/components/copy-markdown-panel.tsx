"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const sampleMarkdown = `# Getting Started

Welcome to **DinoDocs** — a digital garden for
notes, experiments, and product documentation.

## Highlights

- Independent product docs and note collections
- Raw Markdown via the \`.md\` suffix
- \`llms.txt\` and \`llms-full.txt\` for AI readers

> Everything here is copy-paste friendly.`;

export function CopyMarkdownPanel({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleMarkdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-white">Copy Markdown</p>
          <p className="mt-1 text-sm text-white/50">Copy any page as Markdown with one click.</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/80 transition-colors hover:border-fd-primary/50 hover:bg-fd-primary/10 hover:text-fd-primary"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-4 h-36 overflow-hidden whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-white/[0.04] p-3 font-mono text-[11px] leading-5 text-white/50 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
        {sampleMarkdown}
      </pre>
    </div>
  );
}
