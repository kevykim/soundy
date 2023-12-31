



import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getArtist } from "../../../store/artists";
import { NavLink } from "react-router-dom";
import { thunk_getAllSongs } from "../../../store/songs";
import { thunk_getAllAlbum } from "../../../store/albums";

import { Icon } from "@iconify/react/dist/iconify.js";

import { thunk_getAllPlaylists } from "../../../store/playlists";
import EditPlaylist from "../../Playlists/EditPlaylist";
import DeletePlaylist from "../../Playlists/DeletePlaylist";

function ArtistPlaylists () {
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
    
    const albumSongs = songs.filter((song) => song?.Artist?.username === username)
    


    const findPlaylists = useSelector((state) => state.playlists)

    const playlists = Object.values(findPlaylists)

    const userPlaylists = playlists.filter((user) => user.userId === artist?.id)

    const playlistSongs = userPlaylists.map((song => song.Songs))
    



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
                <div className="">{userPlaylists.map((playlist) => 
                    (<div className="flex flex-row p-4  w-900" key={playlist?.id}>
                    <img className="h-40 w-40" src={playlist?.imageUrl}></img>
                    <div className="flex flex-col ml-4">
                    <div className="text-xs text-gray-400">{username}</div>
                    <div className="text-sm">{playlist?.name}</div>
                    <div className="flex flex-col border border-gray-300 w-650 mt-4">
                        {playlistSongs.map((songs) => songs?.map(song => (
                            <NavLink
                            to={`/songs/${song.id}`}
                            className="hover:bg-slate-100 flex flex-row border border-gray-300 p-1"
                            key={song.id}
                            >
                <img className="w-5 h-5" src={song.imageUrl} alt={song.title} />
                <div className="ml-2 font-semibold text-sm leading-relaxed">
                  {song.title}
                </div>
              </NavLink>
                     )))}
                    </div>
                        {artist?.id === sessionUser?.id && 
                            <div className="flex flex-row mt-2">
                                 <div className="flex flex-row justify-between mb-3  p-1 items-center border border-gray-500 w-16">
                                    <Icon icon="ph:share-bold" color="gray" width="17" />
                                    <div className="text-xs">Share</div>
                                </div>
                                <EditPlaylist playlistId={playlist?.id} />
                                <DeletePlaylist playlistName={playlist?.name} playlistId={playlist?.id}/>
                            </div>}
                    </div>
                </div>))}
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






export default ArtistPlaylists;