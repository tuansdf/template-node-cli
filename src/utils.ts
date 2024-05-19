import { existsSync, mkdirSync } from "~/lib/fs.js";
import { dirname } from "~/lib/path.js";

export const wait = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

export const getFileExtension = (uri: string) => {
  const split = uri.split(".");
  return split[split.length - 1];
};

export const panic = (message: unknown) => {
  console.error(message);
  process.exit(1);
};

export const ensureDirectoryExistence = (filePath: string) => {
  const dir = dirname(filePath);
  if (existsSync(dir)) {
    return true;
  }
  ensureDirectoryExistence(dir);
  mkdirSync(dir);
};
