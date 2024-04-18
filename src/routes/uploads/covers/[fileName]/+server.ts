import path from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const { fileName } = params;
  const filePath = path.resolve('uploads/covers', fileName);
  const file = Bun.file(filePath);
  const data = await file.arrayBuffer();
  const contentType = file.type;
  return new Response(data, { status: 200, headers: { 'Content-Type': contentType } });
};
