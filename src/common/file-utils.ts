import type { ICard } from "@src/models/Card";
import fs from "node:fs/promises";

export interface CardData {
  id: string;
  name: string;
  rarity: string;
  color?: string;
  ink_cost?: number;
}

export const readJSONFile = async (filePath: string): Promise<CardData[]> => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Failed to read or parse JSON file: ${error.message}`);
  }
};
