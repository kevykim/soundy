import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunk_createComment, thunk_getAllComments } from "../../../store/comments";

function CreateComment ({findSong, songId, userId }) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');

    const submitComment = (event) => {
        event.preventDefault();
        
        return dispatch(thunk_createComment({
            songId,
            userId,
            body,
        }))
    }

    useEffect(() => {
        dispatch(thunk_getAllComments(songId))
    },[dispatch, songId])


    
    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitComment(event);
      setBody('');
    }
  };

    return (
         <form onSubmit={submitComment} className="bg-gray-200 z-1 flex flex-row">
            <img className="w-10 h-10 p-1" src={findSong?.Artist?.profileImg}></img>
            <div className="p-2">
            <input className="z-2"
             value={body}
             onChange={(event) => setBody(event.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="Write a comment"
              size={145}
               type="text"></input>
            </div>
        </form>
    )
}  







export default CreateComment;