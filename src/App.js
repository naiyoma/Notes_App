import React from "react"
import Sidebar  from "./components/Sidebar";
import Editor  from "./components/Editor";
import Split from "react-split"
import {nanoid} from "nanoid"
import { data } from "./components/data";


import './App.css';

function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Add Notes Title"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentNoteId
      ? { ...oldNote, body: text}
      : oldNote
      
    }))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }


  return (
    <main>
      {
        notes.length > 0
        ?
      <Split 
        sizes={[30, 80]}
        direction="horizontal"
        className="split"
      >
      <Sidebar
        notes={notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteId}
        newNote={createNewNote}
      />
      {
        currentNoteId && 
        notes.length > 0 &&
        <Editor 
          currentNote={findCurrentNote()}
          updateNote={updateNote}
          />
      }
      </Split>
      :
      <div className="no-notes">
        <div className="card">
          <h1 className="card-title">You Have No Notes.</h1>
          <button
            className="first-note"
            onClick={createNewNote} 
          >
            Create a note
          </button>
        </div>
      </div>
}
    </main>
  )
}

export default App;
