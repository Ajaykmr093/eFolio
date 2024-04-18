import path from 'path';

export async function uploadFile(file: File, subdir?: string) {
  const extension = path.extname(file.name);
  const name = crypto.randomUUID();
  const filename = name + extension;
  const filePath = `uploads/${subdir}${filename}`;
  const fileBuffer = await file.arrayBuffer();
  await Bun.write(filePath, fileBuffer);
  return '/' + filePath;
}
