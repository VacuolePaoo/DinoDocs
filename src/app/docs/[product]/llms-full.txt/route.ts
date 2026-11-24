import { isProductSlug, productLlms } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/docs/[product]/llms-full.txt'>) {
  const { product } = await params;
  if (!isProductSlug(product)) return new Response(null, { status: 404 });
  return new Response(await productLlms[product].full(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
