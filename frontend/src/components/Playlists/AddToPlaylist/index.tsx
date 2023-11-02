import {     useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "../../../context/Modal";

import CreatePlaylist from "../CreatePlaylist";
import { thunk_addSongToPlaylist, thunk_getAllPlaylists } from "../../../store/playlists";
import LoginFormPage from "../../LoginFormPage";




function AddToPlaylist () {
    const [showModal, setShowModal] = useState(false);

    const [showCreate, setShowCreate] = useState(false);

    const [showAdd, setShowAdd] = useState(true);

    const dispatch = useDispatch();

    const sessionUser = useSelector((state : any) => state.session.user);

    const {id} = useParams();

    
    useEffect(() => {
        dispatch(thunk_getAllPlaylists())
    },[dispatch])
    
    const showAddFunc = () => {
        setShowAdd(true)
        setShowCreate(false)
    }

    const showCreateFunc = () => {
        setShowAdd(false)
        setShowCreate(true)
    }



    const findPlaylists = useSelector((state) => state.playlists)

    const playlists = Object.values(findPlaylists)

    const userPlaylists = playlists.filter((user) => user.userId === sessionUser?.id)




    return (
        <>
            <button className="flex flex-row justify-between mt-3 mb-3 p-1 items-center border border-gray-500 w-28" onClick={() => setShowModal(true)}>
            <Icon icon="iconoir:playlist-add" color="gray" width="17" />
                <div className="text-xs">Add to playlist</div>
            </button>
            {showModal && !sessionUser ? (
            <Modal onClose={() => setShowModal(false)}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-full mt-2 mr-2 p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                        </div>
                    <div className="text-center text-2xl mt-5 font-semibold">
                        Log in to continue
                        </div>
                        <LoginFormPage />


                </div>
            </Modal>) : (showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <div className="flex flex-row mt-4 ml-4 mr-4 h-10 justify-between items-center">
                        <div className="flex flex-row">
                        <div className="cursor-pointer hover:border-b-2 border-green-800 hover:text-green-800 h-7" onClick={showAddFunc}>Add to Playlist</div>
                        <div className="ml-3 cursor-pointer hover:border-b-2 border-green-800 hover:text-green-800 h-7" onClick={showCreateFunc}>Create a playlist</div>
                        </div>
                         <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                    </div>
                            <div className="border-b border-gray-200"></div>
                    {showAdd && 
                    <div className="flex flex-col w-96 h-64 p-10">
                        {userPlaylists.map(playlist => (
                            <div className="flex flex-row justify-between" key={playlist.id}>
                                <div className="flex flex-row items-center">
                                <img className="w-8 h-8" src={playlist.imageUrl}></img>
                                <div className="text-sm ml-2">{playlist.name}</div>
                                </div>
                                <button className="hover:border-gray-500 text-sm border border-gray-300 p-2" onClick={() => {const payload = { playlistId: playlist.id, songId: id };
                                dispatch(thunk_addSongToPlaylist(payload))
                                setShowModal(false)
                                }}>Add to Playlist</button>
                            </div>
                        ))}
                        </div>}
                        {showCreate && 
                        <div>
                            <CreatePlaylist closeModal={setShowModal}/>
                            </div>}

                </Modal>
            )}
        </>
    )
}




export default AddToPlaylist;