import { useState,useEffect } from "react";
import NotesList from "./NotesList";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";

const Buckets = ({notes,handleCreateNote,handleDeleteNote}) => {
    const buckets = {
        [uuidv4()]:{
            name:"Unclassified",
            items: notes
        },
        [uuidv4()]:{
            name:"High Priority",
            items:[]
        },
        [uuidv4()]:{
            name:"Low Priority",
            items:[]
        }
    };

    const [columns,setColumns] = useState(buckets);

    useEffect(() => {
        localStorage.setItem(
          'sticky-notes-data',
          JSON.stringify(notes)
        );
      }, [columns]);
    

    const createNote = (text,bucket) => {
        const date = new Date();
        const newNote = {
          id: uuidv4(),
          text: text,
          date: date.toLocaleDateString(),
          group: bucket
        };

        for(var i=0;i<columns.length;i++)
        {
            if(columns[i].name == bucket)
            {
                const newNodesList = [...columns[i].items,newNote];
            }
        }
        const newNotesList = [...notes,newNote];
        // setNotes(newNotesList);
      };

    const onDragEnd = (result,columns,setColumns) => {
        if(!result.destination)
            return;
        const {source,destination} = result;

        if(source.droppableId !== destination.droppableId){
            const sourceColumn = columns[source.droppableId];
            const destinationColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destinationItems = [...destinationColumn.items];
            const [removed] = sourceItems.splice(source.index,1);
            destinationItems.splice(destination.index, 0, removed);
            setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destinationColumn,
                items: destinationItems
            }
            });
        }
        else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
              ...columns,
              [source.droppableId]: {
                ...column,
                items: copiedItems
              }
            });
        }
    };

    return (
        <div >
            <DragDropContext
                onDragEnd={result => onDragEnd(result,columns,setColumns)}>
                {Object.entries(columns).map(([columnId,column],index) => {
                    return (
                        <div key={columnId}>
                            <h1>{column.name}</h1>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided,snapshot) => {
                                    return (
                                        <NotesList 
                                                column = {column} 
                                                handleCreateNote = {createNote} 
                                                handleDeleteNote = {handleDeleteNote}
                                                bucket = {column.name}
                                                provided = {provided}
                                        />
                                    )
                                }}
                            </Droppable>  
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    )
}

export default Buckets;