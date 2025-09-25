import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files are allowed!"));
  }
};

const customStorage = {
  _handleFile(
    req: any,
    file: Express.Multer.File,
    cb: (error?: any, info?: Partial<{ path?: string; size?: number; filename?: string }>) => void
  ) {
    const ext = path.extname(file.originalname) || ".jpg";
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    const outputPath = path.join(uploadsDir, filename);
    const chunks: Buffer[] = [];
    file.stream.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    file.stream.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      try {
        await sharp(buffer)
          .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true })
          .toFile(outputPath);
        cb(null, {
          path: outputPath,
          size: buffer.length,
          filename,
        });
      } catch (err) {
        console.error("Error saving file with sharp:", err);
        cb(err);
      }
    });
    file.stream.on("error", (err) => {
      console.error("Stream error:", err);
      cb(err);
    });
  },
  _removeFile(req: any, file: Express.Multer.File, cb: (error: Error | null) => void) {
    if (file.path) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error removing file:", err);
          cb(err);
        } else {
          cb(null);
        }
      });
    } else {
      cb(null);
    }
  },
};

const upload = multer({ storage: customStorage, fileFilter });

export default upload;
