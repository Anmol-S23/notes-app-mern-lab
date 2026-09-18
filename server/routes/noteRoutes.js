const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// POST /api/notes -> create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note", error: err.message });
  }
});

// GET /api/notes -> fetch all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
});

// DELETE /api/notes/:id -> delete a note by its Mongo _id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
});

module.exports = router;
