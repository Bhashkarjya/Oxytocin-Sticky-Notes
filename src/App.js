import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Buckets from './components/Buckets';

function App() {

  const [notes] = useState([{
    id: uuidv4(),
    text: "My first note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: uuidv4(),
    text: "My second note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: uuidv4(),
    text: "My third note",
    date: "15/04/2021",
    group: "Unclassified"
  },
  {
    id: uuidv4(),
    text: "My fourth note",
    date: "21/05/2022",
    group: "Unclassified"
  }
]);

  const [darkMode,setDarkMode] = useState(false);


  return (
      <div className={`${darkMode && 'dark-mode'}`}>
        <DragDropContext onDropEnd={result => console.log(result)}>
          <div className="container">
            <Header handleDarkMode={setDarkMode}/>
            <Buckets
              notes={notes} 
            />
          </div>
        </DragDropContext>
      </div>
  );
}

export default App;