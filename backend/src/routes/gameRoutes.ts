import express from "express";
import { gameLogic } from "../controllers/gameController";
import {
    createNote,
    getNotes,
    getSingleNote,
} from "../controllers/noteController";

import { authMiddleware } from "../middleware/authMiddleware";

const gameRouter = express.Router();

gameRouter.get("/", gameLogic);


gameRouter.post('/new-game', async (req, res) => {
    try {
      const requestingUser = 1;
      const gameId = await gameLogic('643a4fa229c30352d2ea1269'
      );
      res.status(200).json({ gameId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error starting a new game' });
    }
  });

export default gameRouter;
