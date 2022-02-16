import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import NotesList from "./NotesList";

const Buckets = ({notes,handleCreateNote,handleDeleteNote}) => {
    const [buckets,setBuckets] = useState([
        "Unclassified", "High Priority", "Risks Involved"
    ]);

    return (
        <div >
            {buckets.map(bucket => {
                return (
                    <div>
                        <Droppable>
                        <h1>{bucket}</h1>
                        <NotesList 
                            notes = {notes.filter(note => note.group === bucket)} 
                            handleCreateNote = {handleCreateNote} 
                            handleDeleteNote = {handleDeleteNote}
                            bucket = {bucket}
                            />
                        </Droppable>
                    </div>
                )
            })}
        </div>
    )
}

export default Buckets;