import NoteContext from "./noteContext";
import { useState } from "react";
import { BASE_URL } from "../../constant/contant";
const NoteState = (props) => {
  const API_URL = BASE_URL;
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    try {
      const response = await fetch(`${API_URL}/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log(error);
      alert('internal server error');
    }
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    try {
      const response = await fetch(`${API_URL}/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      const note = await response.json();
      setNotes(notes.concat(note))
    } catch (error) {
      console.log(error);
      alert('internal server error');
    }

  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    try {
      const response = await fetch(`${API_URL}/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      let json = response.json();
      console.log(json);
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
      alert('internal server error');
    }

  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    try {
      const response = await fetch(`${API_URL}/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      let json = await response.json();
      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
      alert('internal server error');
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;