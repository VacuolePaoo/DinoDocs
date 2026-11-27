'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { FileText, NotebookPen, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = { file: FileText, notebook: NotebookPen };

export function DocCard({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: keyof typeof icons;
}) {
  const Icon = icons[icon];
  return (
    <Link
      href={href}
      className="group relative block h-44 overflow-hidden rounded-2xl border bg-fd-card transition-colors hover:border-fd-primary/50"
    >
      <motion.div className="relative h-full w-full" initial={false} whileHover="hover">
        <Icon className="absolute left-5 top-5 size-6 text-fd-primary" strokeWidth={1.8} aria-hidden="true" />
        <motion.span
          variants={{ hover: { scale: 1.12 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 12 }}
          className="absolute bottom-4 left-5 inline-block origin-bottom-left text-2xl font-semibold"
        >
          {title}
        </motion.span>
      </motion.div>
    </Link>
  );
}
