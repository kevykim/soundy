import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getAllSongs } from "../../store/songs";
import { NavLink } from "react-router-dom";
import SignUpModal from "../SignUpModal.ts";
import LoginFormModal from "../LoginModal";

interface songInterface {
    id : number
    imageUrl : string
}


function HomePage () {
    const dispatch = useDispatch();
  const loggedIn = useSelector((state : any) => state.session.user);


  const songs = useSelector((state : any) => state.songs)
    const allSongs : songInterface[] = Object.values(songs)


useEffect(() => {
    dispatch(thunk_getAllSongs())
}, [dispatch])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        {!loggedIn ?  <div className="flex flex-col items-center justify-center">
            <div>Image Place holder</div>
            <div> Hear what's trending for free</div>
                <div className="flex flex-wrap justify-between ">
            {allSongs.map((song : songInterface) => <div key={song.id}>
                <NavLink to={`/songs/${song.id}`}>
                <img className="w-48 h-48 p-1" src={song.imageUrl} alt="song_image"  ></img>
                </NavLink>
            </div>)}
                </div>
            <div>
                Explore trending playlists
            </div>
                    <div className="flex flex-col items-center justify-center">
                        <div>Thanks for listening</div>
                        <div>
                            Save tracks, follow artists and build playlists. All for free
                        </div>
                        <SignUpModal />
                        <div>
                            <div> Already have an account? </div>
                            <LoginFormModal />
                        </div>
                    </div>
            </div>
            : <div>
                {/* once a user is logged in see only their playlists */}

            </div>}
            <footer> About us ETC ETC ETC</footer>
        </div>
    )
}







export default HomePage