import React ,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_createComment, thunk_getAllComments } from "../../../store/comments";

// interface CreateCommentProps {
//   findSong : string,
//   songId : number,
//   userId : number, 
//   username : string
// }

function CreateComment  ({songId, userId, username }) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const sessionUser = useSelector((state : any) => state.session.user);

    console.log(sessionUser)

    const submitComment = async () => {
        
        await dispatch(thunk_createComment({
            User : {username},
            songId,
            userId,
            body,
        }))

       await dispatch(thunk_getAllComments(songId))

    }

    useEffect(() => {
      const validation = []
      if (body.length >= 100) validation.push("Comments must be less than 100 characters");
      setErrors(validation) 
    },[body.length])


    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
    if (errors.length > 0) {
      event.preventDefault();
    } else {
      submitComment();
      setBody('');
    }
  }
  };

    const onSubmit = ( event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitComment();
      setBody('');
    }

    return (
      <div className="bg-gray-200">
         <form onSubmit={onSubmit} className=" z-1 flex flex-row items-center">
            <img className="w-12 h-12 p-1" src={sessionUser?.profileImg}></img> 
            <div className="p-2">
            <input className="z-2"
             value={body}
             onChange={(event) => setBody(event.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="Write a comment"
              size={140}
               type="text"></input>
            </div>
        </form>
            {errors && (<p className="text-xs ml-14 mb-4 text-red-500">{errors}</p>)}
      </div>
    )
}  







export default CreateComment;