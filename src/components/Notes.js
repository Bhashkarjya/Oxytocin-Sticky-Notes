import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import { useState} from "react";

const Notes = ({id,text,date,handleDeleteNote,handleEditNote,columnId}) => {

    const [edit,setEdit] = useState(false);
    const characterLimit = 140;
    const [editText,setEditText] = useState(text);

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
            (
            <div>
                <span>{text}</span>
            </div>)}

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
                            onClick={() => handleDeleteNote(id,columnId)}
                        />
                    </span>
                </div>
            ):
            (
                <div className="note-footer">
                    <small>{characterLimit - text.length}</small>
                    <button className="save" onClick={(e) => {
                        handleEditNote(e,id,date,editText,columnId)
                        setEdit(false);
                    }}>Save</button>
                </div>
            )}
            
        </div>
    )
};

export default Notes;