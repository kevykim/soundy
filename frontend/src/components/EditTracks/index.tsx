
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunk_editSong } from "../../store/songs";

function EditTracks () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTrack = useSelector((state) => state.songs[id])

    const {albumId, title, description, url, imageUrl} = currentTrack

    const [editTitle, setTitle] = useState(title);
    const [editDescription, setDescription] = useState(description);
    const [editUrl, setUrl] = useState(url);
    const [editImageUrl, setImageUrl] = useState(imageUrl);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true)
        return dispatch(thunk_editSong({
            id,
            albumId : albumId || null,
            title: editTitle,
            description: editDescription,
            url: editUrl,
            imageUrl: editImageUrl}));

        }
        
        if (submitted) {
            navigate('/tracks')
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
              value={editTitle}
              placeholder="title"
               onChange={(event) => setTitle(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="genre"
               value={editDescription}
               onChange={(event) => setDescription(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="song url"
               value={editUrl}
               onChange={(event) => setUrl(event.target.value)} 
               />
            <input
             className="border border-black"
              type="text"
              placeholder="image url"
               value={editImageUrl}
               onChange={(event) => setImageUrl(event.target.value)} 
               />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" type="submit" >Submit</button>
        </form>
            </div>
        </>
    )
}






export default EditTracks;