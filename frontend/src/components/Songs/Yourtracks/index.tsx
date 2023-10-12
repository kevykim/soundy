import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getCurrentUserSongs } from "../../../store/songs";
import { NavLink } from "react-router-dom";
import DeleteModal from "../DeleteTrack";




function YourTracks() {
const dispatch = useDispatch();

const current = useSelector((state) => state.songs)
const currentsongs = Object.values(current)


useEffect(() => {
    dispatch(thunk_getCurrentUserSongs())
},[dispatch])

    return (
        <>
        <div className="flex flex-row p-2 justify-between w-60">
                <NavLink to='/upload'>Upload</NavLink>
                <NavLink to='/tracks'>Your tracks</NavLink>
                <NavLink to='/albums'>Albums</NavLink>
            </div>
        <div>
            <h1>Your tracks</h1>
            <div className="flex flex-col">
                {currentsongs.map((song) => <div className="flex flex-row" key={song.id}>
                    <div>{song.title}</div>
                    <img className="w-24 h-24" src={song.imageUrl}></img>
                    <div>
                    <NavLink to={`/songs/${song.id}/edit`}>Edit</NavLink>
                    <DeleteModal id={song.id} />
                    </div>
                </div>)}
            </div>
        </div>
        </>
    )
}




export default YourTracks;