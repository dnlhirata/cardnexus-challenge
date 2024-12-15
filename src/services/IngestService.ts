
import { readJSONFile } from "@src/common/file-utils";
import type { Game, ICard, LorcanaRarity, MTGRarity } from "@src/models/Card";
import { bulkInsertCards } from "@src/repos/CardRepo";

export const ingestCardsFromJSON = async (game: string, filePath: string) => {
  try {
    const cards = await readJSONFile(filePath);

    if (!Array.isArray(cards)) {
      throw new Error("Invalid JSON format: Expected an array of cards.");
    }

    const formatedCards: ICard[] = [];
    for (const card of cards) {
      const { id, name, rarity, ...attributes } = card;

      const formatedCard = {
        _id: id,
        game: game as Game,
        name,
        rarity: rarity as MTGRarity | LorcanaRarity,
        attributes,
      }

      formatedCards.push(formatedCard);
    }

    await bulkInsertCards(formatedCards);
  } catch (error) {
    console.error("Error during card ingestion:", error);
    throw error;
  }
};
