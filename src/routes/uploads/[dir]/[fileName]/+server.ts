import path from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const { fileName, dir } = params;
  const filePath = path.resolve(`uploads/${dir}`, fileName);
  const file = Bun.file(filePath);
  const data = await file.arrayBuffer();
  const contentType = file.type;
  return new Response(data, { status: 200, headers: { 'Content-Type': contentType } });
};
