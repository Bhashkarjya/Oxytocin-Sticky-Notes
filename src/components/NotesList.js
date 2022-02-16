import Notes from "./Notes";
import CreateNote from "./CreateNote";

const NotesList = ({notes,handleCreateNote,handleDeleteNote,bucket}) => {
    return (
        <div className="notes-list">
            {notes.map(note => {
                return (
                    <Notes 
                        id = {note.id} 
                        text = {note.text} 
                        date = {note.date} 
                        handleDeleteNote={handleDeleteNote}
                    />
                );
            })}
            <CreateNote handleCreateNote={handleCreateNote} bucket = {bucket}/>
        </div>
    )
};

export default NotesList;