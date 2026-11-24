import Link from 'next/link';
import { House } from 'lucide-react';

export function HomeButton() {
  return (
    <Link
      href="/"
      className="flex h-10 w-full items-center gap-3 rounded-xl border bg-fd-secondary/50 px-3 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent"
    >
      <House className="size-4 shrink-0" />
      返回首页
    </Link>
  );
}
