import { useEffect, useState } from 'react';
import './App.css';
import {nanoid} from "nanoid";
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Buckets from './components/Buckets';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [notes,setNotes] = useState([{
    id: nanoid(),
    text: "My first note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: nanoid(),
    text: "My second note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: nanoid(),
    text: "My third note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: nanoid(),
    text: "My fourth note",
    date: "21/05/2022",
    group: "Unclassified"
  }
]);

  const [searchText,setSearchText] = useState('');
  const [darkMode,setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('sticky-notes-data')
    );

    if(savedNotes)
      setNotes(savedNotes);
  },[]);

  useEffect(() => {
    localStorage.setItem(
      'sticky-notes-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  const createNote = (text,bucket) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
      group: bucket
    };
    const newNotesList = [...notes,newNote];
    setNotes(newNotesList);
  };

  const deleteNote = (id) => {
    const newNotesList = notes.filter((note) => note.id !== id);
    setNotes(newNotesList);
  }

  return (
    <DragDropContext>
      <div className={`${darkMode && 'dark-mode'}`}>
        <div className="container">
          <Header handleDarkMode={setDarkMode}/>
          <SearchBar handleSearchNote={setSearchText}/>
          <Buckets
            notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
            handleCreateNote={createNote}
            handleDeleteNote={deleteNote}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
