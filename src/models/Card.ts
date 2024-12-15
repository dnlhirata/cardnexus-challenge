import mongoose, { Schema } from 'mongoose';

export enum Game {
  MTG = "mtg",
  Lorcana = "lorcana",
}

export enum MTGRarity {
  Common = "common",
  Mythic = "mythic",
  Rare = "rare",
  Special = "special",
  Uncommon = "uncommon",
}

export enum LorcanaRarity {
  Common = "Common",
  Enchanted = "Enchanted",
  Legendary = "Legendary",
  Promo = "Promo",
  Rare = "Rare",
  SuperRare = "Super Rare",
  Uncommon = "Uncommon",
}

interface BaseCard {
  _id: string;
  game: Game;
  name: string;
  rarity: MTGRarity | LorcanaRarity;
}

export interface MTGCardAttributes {
  color?: "U" | "B" | "G" | "R" | "W";
}

export interface LorcanaCardAttributes {
  ink_cost?: number;
}

export interface ICard extends BaseCard {
  attributes: MTGCardAttributes | LorcanaCardAttributes;
}

const cardSchema = new Schema<ICard>({
  _id: { type: String, required: true },
  game: { type: String, required: true, enum: [...Object.values(Game)] },
  name: { type: String, required: true },
  rarity: {
    type: String,
    required: true,
    enum: [...Object.values(MTGRarity), ...Object.values(LorcanaRarity)],
  },
  attributes: {
    type: Schema.Types.Mixed,
    default: {},
  },
});
cardSchema.index({ name: 'text' });
cardSchema.index({ game: 'text' });

export const Card = mongoose.model<ICard>("Card", cardSchema);
