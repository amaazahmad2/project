import { RequestHandler } from "express";
import NoteModel from "../models/noteModel";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getSingleNote: RequestHandler = async (req, res, next) => {
    const noteID = req.params.noteId;
    try {
        const note = await NoteModel.findById(noteID).exec();
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const createNote: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};
