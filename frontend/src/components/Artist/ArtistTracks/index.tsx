import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getArtist } from "../../../store/artists";
import { NavLink } from "react-router-dom";
import { thunk_getAllSongs } from "../../../store/songs";
import { thunk_getAllAlbum } from "../../../store/albums";
import { thunk_getAllPlaylists } from "../../../store/playlists";
import DeleteModal from "../../Songs/DeleteTrack";

import { Icon } from "@iconify/react/dist/iconify.js";

function ArtistTracks () {
    const dispatch = useDispatch();
    const {username} = useParams(); 

    useEffect(() => {
        dispatch(thunk_getArtist(username))
        dispatch(thunk_getAllSongs())
        dispatch(thunk_getAllAlbum())
        dispatch(thunk_getAllPlaylists())
    }, [dispatch, username])

    const sessionUser = useSelector((state : any) => state.session.user);

    const findArtist = useSelector((state) => state.artist )

    const artist = Object.values(findArtist)[0]

    const findSongs = useSelector((state) => state.songs)

    const songs = Object.values(findSongs)


    const artistSongs = songs.filter((artist) => artist?.Artist?.username === username)


    const findAlbums = useSelector((state) => state.albums)

    const albums = Object.values(findAlbums)

    const artistAlbums = albums.filter((artist) => artist?.Artist?.username === username)


     const findPlaylists = useSelector((state) => state.playlists)

    const playlists = Object.values(findPlaylists)

    const userPlaylists = playlists.filter((user) => user.userId === artist?.id)

    return (
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-8 h-60 bg-gradient-to-r from-neutral-300 to-stone-400 justify-center w-full">
            <div className="flex flex-row">
                <img className="h-52 w-52" src={artist?.profileImg}></img>
                <div className="flex ml-4 text-2xl font-bold bg-black text-white h-12 w-40 text-center items-center justify-center">{artist?.username}</div>
            </div>
        </div>
            <div className="flex flex-row mt-4 z-10 ml-6 p-4 self-start justify-between w-64 h-14 font-semibold">
                  <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to={`/artists/${artist?.username}`}>All</NavLink>
                  <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to={`/artists/${artist?.username}/tracks`}>Tracks</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to={`/artists/${artist?.username}/albums`}>Albums</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to={`/artists/${artist?.username}/playlists`}>Playlists</NavLink>
            </div>
            <div className="h-1 border-b-2 w-full border-gray-100 mb-2"></div>
            <div className="flex flex-row justify-between mt-4" style={{width: "1200px"}}>
                <div className="">{artistSongs.map((song) => 
                    (
                    <div className="flex flex-col p-4 bg-slate-100 border border-gray-400 w-750 mt-4 mb-4 shadow-md">
                    <div className=" flex flex-row mb-4" key={song.id}>
                    <img className="h-40 w-40" src={song?.imageUrl}></img>
                    <div className="flex flex-col ml-4">
                    <div className="text-xs text-gray-400">{username}</div>
                    <NavLink to={`/songs/${song.id}`} className="hover:underline hover:text-green-700 text-sm">{song?.title}</NavLink>
                    </div>
                </div>
                    {artist?.id === sessionUser?.id && 
                            <div className="flex flex-row mt-2">
                                 <div className="flex flex-row justify-between mb-3  p-1 items-center border border-gray-500 w-16">
                                    <Icon icon="ph:share-bold" color="gray" width="17" />
                                    <div className="text-xs">Share</div>
                                </div>
                                <NavLink to={`/songs/${song?.id}/edit`} className="flex flex-row justify-between mb-3 ml-2 p-1 items-center border border-gray-500 w-14">
                                    <Icon icon="icon-park-outline:edit-two" color="gray" width="17" />
                                    <div className="text-xs">Edit</div>
                                 </NavLink>
                                <DeleteModal songTitle={song?.title} id={song?.id}/>
                            </div>}
                </div>
                ))}
                
                
                </div>
                
                <div className="flex flex-row border-l-2 border-gray-100">
                    <div className=" flex flex-row w-80 ml-8">
                        <div className="flex flex-col mr-4">
                    <div className="text-xs text-gray-400">Tracks</div>
                    <div className="text-2xl text-gray-400">{artistSongs?.length}</div>
                        </div>
                        <div className="flex flex-col h-10 border-l-2 border-gray-100">
                            <div className="ml-4 mr-4">
                    <div className="text-xs text-gray-400">Albums</div>
                    <div className="text-2xl text-gray-400">{artistAlbums?.length}</div>
                            </div>
                        </div>
                        <div className="flex flex-col h-10 border-l-2 border-gray-100">
                            <div className="ml-4">
                    <div className="text-xs text-gray-400">Playlists</div>
                    <div className="text-2xl text-gray-400">{userPlaylists?.length}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}






export default ArtistTracks;