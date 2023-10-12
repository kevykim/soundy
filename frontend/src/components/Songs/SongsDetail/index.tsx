import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunk_getASong } from "../../../store/songs";


function SongsDetail() {
        const dispatch = useDispatch();
        const { id } = useParams();   

        const findSong = useSelector((state : any) => state.songs[id])

        useEffect(() => {
            dispatch(thunk_getASong(id));
        },[dispatch, id]);



    return (
        <div>
        <div className="h-96 flex flex-row bg-blue-200 justify-between p-5">
            <div className="flex flex-row ">
                <div>
                    playbutton
                </div>
                <div className="flex flex-col">
                    <h1>{findSong.title}</h1>
                    <h2>{findSong.Artist?.username}</h2>
                </div>
            </div>
            <img className="w-80 h-80" src={findSong.imageUrl}></img>
        </div>
        <div>add playlist button</div>
        <div>comment section</div>
        </div>
    )
}


export default SongsDetail;