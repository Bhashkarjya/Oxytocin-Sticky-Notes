import Notes from "./Notes";
import CreateNote from "./CreateNote";
import { Draggable, Droppable } from "react-beautiful-dnd";

const NotesList = ({column,handleCreateNote,handleDeleteNote,bucket,provided}) => {
    return (
        <div className="notes-list" {...provided.droppableProps} ref={provided.innerRef}>
            {column.items.map((item,index) => {
                return (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                    >
                        {(provided,snapshot) => {
                            return(
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Notes 
                                        id = {item.id} 
                                        text = {item.text} 
                                        date = {item.date} 
                                        handleDeleteNote={handleDeleteNote}
                                    />
                                </div>
                            )
                        }}
                        
                    </Draggable>
                );
            })}
            <CreateNote handleCreateNote={handleCreateNote} bucket = {bucket}/>
            {provided.placeholder}
        </div>
    )
};

export default NotesList;