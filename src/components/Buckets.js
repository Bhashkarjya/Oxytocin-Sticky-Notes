import { useState,useEffect } from "react";
import NotesList from "./NotesList";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext,Droppable } from "react-beautiful-dnd";
import SearchBar from "./SearchBar";
import CreateBucket from "./CreateBucket";
import BucketForm from "./BucketForm";
import Options from "./Options";
import UngroupedList from "./UngroupedList";

const Buckets = ({notes}) => {
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

    useEffect(() => {
        const savedData = JSON.parse(
            localStorage.getItem('sticky-notes-data')
        )
        if(savedData)
            setColumns(savedData);
    },[]);

    const [columns,setColumns] = useState(buckets);
    const [searchText,setSearchText] = useState('');
    const [createBucket,setCreateBucket] = useState(false);
    const [group,setGroup] = useState(true);

    useEffect(() => {
        localStorage.setItem(
          'sticky-notes-data',
          JSON.stringify(columns)
        );
      }, [columns]);
    
    
    const createNote = (text,column,columnId) => {
        const date = new Date();
        const newNote = {
          id: uuidv4(),
          text: text,
          date: date.toLocaleDateString(),
          group: column
        };
        const updatedColumn = columns[columnId];
        const updatedItems = updatedColumn.items;
        updatedItems.push(newNote);
        setColumns({
            ...columns,
            [columnId]:{
                name:updatedColumn.name,items: updatedItems
            }
        });
      };
    
    const deleteNote = (id,columnId) => {
        const updatedColumn = columns[columnId];
        const updatedItems = updatedColumn.items.filter((item) => item.id !== id);
        setColumns({
            ...columns,
            [columnId]:{
                name: updatedColumn.name,
                items: updatedItems
            }
        });
    };

    const editNote = (e,id,date,text,columnId) => {
        e.preventDefault();
        const updatedNote = {
            id: id,
            text: text,
            date: date,
            group: columns[columnId].name
        };

        const updatedColumn = columns[columnId];
        const updatedItems = updatedColumn.items.filter((item) => item.id !== id);
        updatedItems.push(updatedNote);
        setColumns({
            ...columns,
            [columnId]:{
                name: updatedColumn.name,
                items: updatedItems
            }
        });
    }
    
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

    const handleBucketSubmit = (bucket) => {
        const newBucket = {
            name: bucket,
            items:[]
        };
        const newObject = {
            key:[uuidv4()],
            pair:newBucket
        };
        console.log("asdas");
        const updatedBucketList = Object.assign(columns,newObject);
        console.log(newObject);
        // console.log(columns);
        // setCreateBucket(false);
    }

    return (
        <div >
            <SearchBar handleSearchNote={setSearchText}/>
            
            {
                createBucket ? (
                    <BucketForm handleSubmit = {handleBucketSubmit}/>
                ):
                (<CreateBucket handleCreateBucket={setCreateBucket}/>)
            }
            <Options handleGrouping = {setGroup}/>
            { group ? (
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
                                                searchText = {searchText}
                                                column = {column} 
                                                handleCreateNote = {createNote} 
                                                handleDeleteNote = {deleteNote}
                                                handleEditNote = {editNote}
                                                columnId = {columnId}
                                                provided = {provided}
                                        />
                                    )
                                }}
                            </Droppable>  
                        </div>
                    )
                })}
            </DragDropContext>):(
            <div>
                {Object.entries(columns).map(([columnId,column],index) => {
                    return (
                        <div key={columnId}>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided,snapshot) => {
                                    return (
                                        <UngroupedList
                                                searchText = {searchText}
                                                column = {column} 
                                                handleCreateNote = {createNote} 
                                                handleDeleteNote = {deleteNote}
                                                handleEditNote = {editNote}
                                                columnId = {columnId}
                                                provided = {provided}
                                        />
                                    )
                                }}
                            </Droppable>  
                        </div>
                    )
                })}
            </div>
            )
            }
        </div>
    )
}

export default Buckets;