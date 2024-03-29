import React from "react"
import Sidebar  from "./components/Sidebar";
import Editor  from "./components/Editor";
import Split from "react-split"
import {nanoid} from "nanoid"
import { data } from "./components/data";


import './App.css';

function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Add Notes Title"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(oldNotes => {
    const newArray = []
    for (let i = 0; i < oldNotes.length; i++) {
      const oldNote = oldNotes[i]
      if(oldNote.id === currentNoteId ) {
          newArray.unshift({ ...oldNote, body: text})
      }else {
        newArray.push(oldNote)
      }
    }
    return newArray
  })
}

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
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
        deleteNote={deleteNote}
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
