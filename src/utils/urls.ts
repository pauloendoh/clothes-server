import { config } from "dotenv";
config();

export const urls = {
  publicUploads: (fileName: string) =>
    `${process.env.UPLOADS_BASE_URL}/${fileName}`,
};
