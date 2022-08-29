import { randomBytes } from "crypto";
import multer, { diskStorage } from "multer";
import path from "path";

const UPLOAD_PATH = path.resolve(__dirname, "../../public/uploads");

const localDiskStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    // garantir que os nomes não se sobreponham
    // usa-se um hash
    randomBytes(16, (err, hash) => {
      if (err) throw err;

      const filename = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, filename);
    });
  },
});

export const multerConfig: multer.Options = {
  dest: path.resolve(UPLOAD_PATH),
  storage: Boolean(process.env.IS_DISK_STORAGE)
    ? localDiskStorage
    : localDiskStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
