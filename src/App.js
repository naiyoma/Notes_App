import React from "react"
import Sidebar  from "./components/Sidebar";

import './App.css';

function App() {

  const [notes, setNotes] = React.useState([])
  return (
    <main>
      <Sidebar
        notes={notes}
      />
    </main>
  );
}

export default App;
