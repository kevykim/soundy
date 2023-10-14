import React ,{ ReactEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { thunk_createComment, thunk_getAllComments } from "../../../store/comments";

// interface CreateCommentProps {
//   findSong : string,
//   songId : number,
//   userId : number, 
//   username : string
// }

function CreateComment  ({findSong, songId, userId, username }) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');

    const submitComment = async () => {
        
        await dispatch(thunk_createComment({
            User : {username},
            songId,
            userId,
            body,
        }))

       await dispatch(thunk_getAllComments(songId))

    }


    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitComment();
      setBody('');
    }
  };

    const onSubmit = ( event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitComment();
      setBody('');
    }

    return (
         <form onSubmit={onSubmit} className=" z-1 flex flex-row">
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