import path from "node:path";
import mongoose from "mongoose";
import { ingestCardsFromJSON } from "@src/services/IngestService";

const MONGO_URI = "mongodb://mongodb:27017/tcg_database";

const main = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const files = {
      mtg: path.join(__dirname, "../data/mtg-cards.json"),
      lorcana: path.join(__dirname, "../data/lorcana-cards.json"),
    }
    for (const [key, value] of Object.entries(files)) {
      await ingestCardsFromJSON(key, value);
    }
    console.log("Data ingestion complete.");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error during ingestion:", error.message);
    process.exit(1);
  }
};

main();
