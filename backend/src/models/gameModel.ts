import { InferSchemaType, Schema, model } from "mongoose";

const gameSchema = new Schema({
    gameId: { type: String, required: true, unique: true },
    word: { type: String, required: true },
    revealedWord: { type: String, required: true },
    matches: { type: [String], required: true },
    mismatches: { type: [String], required: true },
    wordProposer: { type: String, required: true },
    hangman: { type: String, required: true },
    winner: { type: String },
    status: { type: String, required: true },
  });
  
type Game = InferSchemaType<typeof gameSchema>;

export default model<Game>("Game", gameSchema);
