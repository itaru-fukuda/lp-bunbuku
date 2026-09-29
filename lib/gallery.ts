import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export const getExpressionImages = cache(async (): Promise<string[]> => {
  try {
    const files = await readdir(path.join(process.cwd(), "public/images/expressions"));
    return files.filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .map((file) => `/images/expressions/${file}`);
  } catch {
    console.error("Failed to read expression gallery");
    return [];
  }
});
