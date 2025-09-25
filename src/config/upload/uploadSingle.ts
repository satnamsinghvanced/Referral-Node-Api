import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;

const storage = multer.memoryStorage();
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

const upload = multer({ storage, fileFilter });
export const resizeAndSaveImage = async (req: Express.Request, res: any, next: any) => {
  if (!req.file) {
    return next();
  }
  try {
    const ext = path.extname(req.file.originalname) || ".jpg";
    const filename = `${Date.now()}-${req.file.fieldname}${ext}`;
    const outputPath = path.join("uploads", filename);
    await sharp(req.file.buffer)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFile(outputPath);
    req.file.filename = filename;
    next();
  } catch (error) {
    next(error);
  }
};

export default upload;
