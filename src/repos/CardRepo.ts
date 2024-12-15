import mongoose from "mongoose";
import type { ParsedQs } from 'qs';
import { Card, type ICard } from "@src/models/Card";

const MONGO_URI = "mongodb://mongodb:27017/tcg_database";

interface ICardFilters {
  game?: string;
  name?: { $regex: string, $options: string };
  rarity?: { $in: string[] };
  'attributes.color'?: { $in: string[] };
  'attributes.ink_cost'?: { $gte: number, $lte: number } | number;
}
const buildFilters = (query: ParsedQs) => {
  const filters: ICardFilters = {};

  if (query.game) {
    filters.game = query.game as string; 
  }

  if (query.name) {
    filters.name = { $regex: query.name as string, $options: 'i' }; 
  }

  if (query.rarity) {
    const rarities = query.rarity as string;
    filters.rarity = { $in: rarities.split(',') };
  }

  if (query.color) {
    const colors = query.color as string;
    filters['attributes.color'] = { $in: colors.toUpperCase().split(',') };
  }

  if (query.ink_cost) {
    const cost = query.ink_cost as string;
    const range = cost.split('-');

    if (range.length === 2) {
      filters['attributes.ink_cost'] = { $gte: Number.parseInt(range[0]), $lte: Number.parseInt(range[1]) };
    } else {
      filters['attributes.ink_cost'] = Number.parseInt(cost);
    }
  }

  return filters;
};

export const bulkInsertCards = async (cards: ICard[]) => {
  try {
    await Card.insertMany(cards, { ordered: false });
    console.log("Cards successfully inserted.");
  } catch (error) {
    console.error("Error inserting cards:", error);
    throw error;
  }
};

const findAll = async (query: ParsedQs): Promise<ICard[]> => {
  await mongoose.connect(MONGO_URI);

  const filters = buildFilters(query);
  const cards = await Card.find(filters).exec();
  await mongoose.disconnect();

  return cards
}

export default {
  findAll,
  bulkInsertCards
}