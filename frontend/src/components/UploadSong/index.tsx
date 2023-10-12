import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunk_createSong } from "../../store/songs";
import { NavLink } from "react-router-dom";


function UploadSong() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state : any) => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // When a user uploads a song, should they also add information for album? 


    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

         return dispatch(thunk_createSong({title, description, url, imageUrl}))
        
    }



    return (
        <>
            <div className="flex flex-row p-2 justify-between w-60">
                <NavLink to='/upload'>Upload</NavLink>
                <NavLink to='/tracks'>Your tracks</NavLink>
                <NavLink to='/albums'>Albums</NavLink>
            </div>
        <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={onSubmit} className="flex flex-col justify-center border border-black p-4 w-1/2 h-96">
            <input
            className="border border-black"
             type="text"
              value={title}
              placeholder="title"
               onChange={(event) => setTitle(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="genre"
               value={description}
               onChange={(event) => setDescription(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="song url"
               value={url}
               onChange={(event) => setUrl(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="image url"
               value={imageUrl}
               onChange={(event) => setImageUrl(event.target.value)} 
               />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" type="submit" >Submit</button>
        </form>
        </div>
        </>
    )
}




export default UploadSong