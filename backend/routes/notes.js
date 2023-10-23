const express = require('express');
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');


//ROUTE 1:Get All the Notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2:Add a new Note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
  body("title", "Enter valid Title").isLength({ min: 3 }),
  body("description", "description must be atleast 5 characters").isLength({ min: 5, }),
], async (req, res) => {

  //If There are returns bad Request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, tag } = req.body;
  try {
    const note = await new Note({ user: req.user.id, title, description, tag });
    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3:Update an existing Note using: PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

  const { title, description, tag } = req.body;
  try {
    //Creating newNote Object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //Find the Note to be Update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE 4:Delete an existing Note using: DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    //Find the Note to be delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
