import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getCurrentUserSongs } from "../../../store/songs";
import { NavLink } from "react-router-dom";
import DeleteModal from "../DeleteTrack";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import LoginFormModal from "../../LoginModal";



function YourTracks() {
const dispatch = useDispatch();

const current = useSelector((state : SongSelector ) => state.songs)
const currentsongs = Object.values(current)

const sessionUser = useSelector((state : any) => state.session.user);



useEffect(() => {
    dispatch(thunk_getCurrentUserSongs())
},[dispatch])

    return (
        <>
        {!sessionUser ? (
        <div className="flex justify-center items-center h-screen mt-5">
        <div className="flex flex-col justify-center items-center mt-4">
            <div className="text-xl font-bold">
            Want to see more? 
            </div>
        <div className="text-4xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-40 text-center rounded shadow-sm"><LoginFormModal /> </div>
        </div>
        </div>
        ) : 
        <>
        <div className="flex flex-row p-4 justify-between w-64 h-14">
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/upload'>Upload</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/tracks'>Your tracks</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/albums'>Albums</NavLink>
            </div>
            <div className="h-1 border-b-2 border-black-500 mb-2"></div>
        <div className="flex flex-col justify-center items-center mt-4">
            <h1 className="text-3xl font-bold">Your tracks</h1>
            <div className="flex flex-col  p-2">
                {(currentsongs as SongInt[]).map((song : SongInt) => <div className="flex flex-row p-8 w-900 justify-between bg-slate-100 border border-gray-400 mt-4 mb-4 shadow-md" key={song?.id}>
                    <div className="items-center p-2">
                    <div className="font-bold text-lg">{song?.title}</div>
                    <div className="font-semibold text-md">{song?.Artist?.username}</div>
                    </div>
                    <div>
                    <img className="w-40 h-40 shadow-md" src={song?.imageUrl}></img>
                    <div className=" mt-2 flex flex-row justify-evenly w-40">
                    <NavLink className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 disabled:bg-gray-500 rounded shadow-sm" to={`/songs/${song?.id}/edit`}>
                        <Icon icon="icon-park-outline:edit-two" />
                    </NavLink>
                    <DeleteModal songTitle={song?.title} id={song?.id} />
                    </div>
                    </div>
                </div>)}
            </div>
        </div>
        </>
        }
        </>
    )
}




export default YourTracks;