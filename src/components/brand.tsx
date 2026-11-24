import Image from 'next/image';
import logo from '@/images/logo.svg';

export function Brand({ title }: { title: string }) {
  return (
    <>
      <Image
        src={logo}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0 invert dark:invert-0"
      />
      <span>{title}</span>
    </>
  );
}
