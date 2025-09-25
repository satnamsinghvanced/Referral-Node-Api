
type FileOrFiles = Express.Multer.File | Express.Multer.File[] | undefined;

const getFileUrl = (files: FileOrFiles, folder = "uploads"): string | string[] | undefined => {
  const baseUrl = process.env.BASE_URL || "";
  if (!files) return undefined;
  if (Array.isArray(files)) {
    return files.map(file => `${baseUrl}/${folder}/${file.filename}`);
  }
  return `${baseUrl}/${folder}/${files.filename}`;
};

export default getFileUrl;
