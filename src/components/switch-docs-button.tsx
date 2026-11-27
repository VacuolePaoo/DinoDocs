import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';

export function SwitchDocsButton() {
  return (
    <Link
      href="/docs"
      className="flex h-10 w-full items-center gap-3 rounded-xl border bg-fd-secondary/50 px-3 text-sm font-medium text-fd-secondary-foreground transition-colors hover:border-fd-primary/50 hover:bg-fd-primary/10 hover:text-fd-primary"
    >
      <ArrowLeftRight className="size-4 shrink-0" />
      切换文档
    </Link>
  );
}
