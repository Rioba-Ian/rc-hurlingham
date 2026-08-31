import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const contentType = searchParams.get('contentType');
  const slug = searchParams.get('slug');
  const redirectUrl = searchParams.get('redirect') || '/';

  const expectedSecret = process.env.PREVIEW_SECRET || 'rc-hurlingham-preview-secret';

  if (secret !== expectedSecret) {
    return new Response('Invalid preview token', { status: 401 });
  }

  // Enable Next.js Draft Mode
  const draft = await draftMode();
  draft.enable();

  redirect(redirectUrl);
}
