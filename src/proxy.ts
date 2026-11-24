import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';

const notes = rewritePath('/notes{/*path}', '/llms.mdx/notes/notes{/*path}');
const docs = rewritePath('/docs{/*path}', '/llms.mdx/docs{/*path}');

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const result =
    isMarkdownPreferred(request) &&
    !/\.(md|txt)$/.test(pathname) &&
    (notes.rewrite(pathname) || docs.rewrite(pathname));

  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl), {
      headers: { Vary: 'Accept' },
    });
  }

  return NextResponse.next();
}
