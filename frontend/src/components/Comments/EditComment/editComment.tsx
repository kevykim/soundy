

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_editComment, thunk_getAllComments } from '../../../store/comments';


function EditableComment({ prevComment, commentId, songId, username }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(prevComment);
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([]);

  const sessionUser = useSelector((state : any) => state.session.user);


  useEffect(() => {
    const validation = []
    if (editComment.length >= 100) validation.push("Comment must be less than 100 characters")
    setErrors(validation)
  },[editComment.length])

  const handleTextClick = () => {
    setIsEditing(true);
  };

 
  const handleInputBlur = (event) => {
    event.preventDefault();
    setIsEditing(false);
    setSubmitted(true);
    dispatch(thunk_editComment({
      id : commentId,
      body : editComment,
      User : {
        username
      }
    }))

  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setIsEditing(false);
     dispatch(thunk_editComment({
      id : commentId,
      body : editComment,
      User : {
        username
      }
    }))
  }

  if (submitted) {
        setSubmitted(false)
        setIsEditing(false);
        dispatch(thunk_getAllComments(songId))
  }

  return (
    <div>
      {isEditing ? (
        <>
        <form className='flex flex-row' onSubmit={onSubmit}>
          <input
            className='text-xs'
            type="text"
            value={editComment}
            onChange={((event) => setEditComment(event.target.value))}
            onBlur={handleInputBlur}
            autoFocus
            />
            {errors.length > 0 && <p className='text-xs text-red-500'>{errors}</p>}
             <button type="submit">Edit</button>
         </form>
        </>
      ) : (
      ((sessionUser?.username === username) ? (
    <span className='text-xs' onClick={handleTextClick}>
      {editComment}
    </span>
     ) : (
    <p className='text-xs'>{editComment}</p>
      ))
    )}
    </div>
  )
}

export default EditableComment;