import express from "express";
import {
    createNote,
    getNotes,
    getSingleNote,
} from "../controllers/noteController";

import { authMiddleware } from "../middleware/authMiddleware";

const noteRouter = express.Router();

noteRouter.get("/", [authMiddleware()], getNotes);
noteRouter.get("/:noteId", [authMiddleware()], getSingleNote);

noteRouter.post("/", [authMiddleware()], createNote);

export default noteRouter;
