import Notes from "./Notes";
import CreateNote from "./CreateNote";
import { Draggable} from "react-beautiful-dnd";

const NotesList = ({column,searchText,handleCreateNote,columnId,handleDeleteNote,handleEditNote,provided}) => {
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
                                    { item.text.includes(searchText)? (
                                        <Notes 
                                        id = {item.id} 
                                        text = {item.text} 
                                        date = {item.date}
                                        handleDeleteNote={handleDeleteNote}
                                        handleEditNote={handleEditNote}
                                        columnId = {columnId}
                                    />
                                    ):
                                    <></>}
                                    
                                </div>
                            )
                        }}
                        
                    </Draggable>
                );
            })}
            <CreateNote handleCreateNote={handleCreateNote} column = {column.name} columnId = {columnId}/>
            {provided.placeholder}
        </div>
    )
};

export default NotesList;