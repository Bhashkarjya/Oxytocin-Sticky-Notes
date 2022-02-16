import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import { useState,useEffect } from "react";

const Notes = ({id,text,date,handleDeleteNote}) => {

    const [edit,setEdit] = useState(false);
    const [notesList,setNotes] = useState([]);
    const characterLimit = 140;
    const [editText,setEditText] = useState(text);

    useEffect(() => {
        const savedNotes = JSON.parse(
          localStorage.getItem('sticky-notes-data')
        );
        setNotes(savedNotes);
        if(savedNotes)
          setNotes(savedNotes);
      },[edit]);
    
    const handleEdit = (e,id,date) => {
        e.preventDefault();
        console.log("clicked");
        console.log(notesList);
        const updatedNote = {
            id: id,
            text: editText,
            date: date
        };
        var updatedList = [];
        for(var i=0;i<notesList.length;i++)
        {
            if(notesList[i].id === id)
            {
                updatedList.push(updatedNote);
            }
            else
                updatedList.push(notesList[i]);
        }
        setNotes(
            updatedList
        );
        localStorage.setItem(
            'sticky-notes-data',
            JSON.stringify(updatedList)
          );
        setEdit(false);
        window.location.reload(false);
    } ;

    return(
        <div className="notes">
            {edit?(
                <div className="notes new-note">
                    <textarea 
                        rows='8' 
                        cols='10' 
                        placeholder="Type to add a note...."
                        value = {editText}
                        onChange = {(e) => setEditText(e.target.value)}
                    ></textarea>
                </div>
            ):
            (<span>{text}</span>)}

            {!edit?(
                <div className="note-footer">
                    <small>{date}</small>
                    <span>
                        <AiFillEdit
                            className="edit-icon"
                            size="1.3em"
                            onClick={() => {
                                if(!edit)
                                    setEdit(!edit);
                            }}
                        />
                        <MdDeleteForever 
                            className="delete-icon" 
                            size="1.3em" 
                            onClick={() => handleDeleteNote(id)}
                        />
                    </span>
                </div>
            ):
            (
                <div className="note-footer">
                    <small>{characterLimit - text.length}</small>
                    <button className="save" onClick={(e) => handleEdit(e,id,date)}>Save</button>
                </div>
            )}
            
        </div>
    )
};

export default Notes;