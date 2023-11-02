import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunk_getASong } from "../../../store/songs";
import { thunk_getAllComments } from "../../../store/comments";
import CreateComment from "../../Comments/CreateComment";
// import EditComment from "../../Comments/EditComment";
import DeleteComment from "../../Comments/DeleteComment";
import CommentModal from "../../LoginModal/comment";
import { NavLink } from "react-router-dom";

import AudioPlayer from 'react-h5-audio-player'
import {Icon} from '@iconify/react'
import EditableComment from "../../Comments/EditComment/editComment";

import detail from '../../../public/assets/detail.png'
import AddToPlaylist from "../../Playlists/AddToPlaylist";

function SongsDetail() {
        const dispatch = useDispatch();
        const { id } = useParams();   

        const sessionUser = useSelector((state : any) => state.session.user);

        const findSong = useSelector((state : SongSelector) => state.songs[id])

        const findComments = useSelector((state : any) => state.comments)
        const allComments : commentsInt[] = Object.values(findComments)

        const filteredComments = allComments.filter((comment) => String(comment.songId) === id )


        const [showDelete, setShowDelete] = useState(false);

        const onClick = (event) => {
            event.preventDefault();
            setShowDelete(!showDelete)
        }


        useEffect(() => {
            dispatch(thunk_getASong(id));
            dispatch(thunk_getAllComments(id));
        },[dispatch, id]);

    return (
        <div className="flex flex-col">
        <div className="h-96 flex flex-row bg-gradient-to-bl from-violet-200 via-sky-400 to-emerald-300 justify-between p-5">
            <div className="flex flex-row p-2 justify-center">
                    <AudioPlayer 
                        // src=""
                        showJumpControls={false}
                        showFilledProgress={false}
                        showDownloadProgress={false}
                        defaultCurrentTime={false}
                        defaultDuration={false}
                        autoPlayAfterSrcChange={false}
                        customVolumeControls={[]}
                        customAdditionalControls={[]}
                        customProgressBarSection={[]}
                        customIcons={{
                            play : <Icon icon="zondicons:play-outline" color="green" width="90"/>,
                            pause : <Icon icon="zondicons:pause-solid" color="green" width="90"/>
                        }}
                        />
                <div className="flex flex-col items-start ml-2">
                    <h1 className="text-3xl bg-black text-white p-1">{findSong?.title}</h1>
                    <NavLink to={`/artists/${findSong?.Artist?.username}`} className="text-2xl mt-1 bg-black text-white p-1">{findSong?.Artist?.username}</NavLink>
                </div>
            </div>
            <img className="w-80 h-80" src={findSong?.imageUrl}></img>
        </div>
        {!sessionUser ? (
        <div className="bg-gray-200 mb-2 p-1">
            <CommentModal />
        </div>) :
         (sessionUser && sessionUser?.id !== findSong?.userId) && 
         (< CreateComment songId={id} userId={sessionUser?.id} username={sessionUser?.username}/>)}
         <div className="flex flex-row ml-10">
         <AddToPlaylist />
         <div className="flex flex-row justify-between ml-2 mt-3 mb-3  p-1 items-center border border-gray-500 w-16">
            <Icon icon="ph:share-bold" color="gray" width="17" />
            <div className="text-xs">Share</div>
         </div>
         <div className="flex flex-row justify-between ml-2 mt-3 mb-3  p-1 items-center border border-gray-500 w-22">
            <Icon icon="octicon:link-16" color="gray" width="17" />
            <div className="text-xs">Copy Link</div>
         </div>
         </div>
        <div className="h-1 border-b-2 w-680 ml-10 border-black-500 mb-2"></div>
        <div className="flex flex-row w-750 border-r-2 border-gray-200">
            <div className="flex flex-col justify-start items-center p-2">
            <img className="w-20 h-20" src={findSong?.Artist?.profileImg}></img>
            <div className="p-2 text-xs">
                {findSong?.Artist?.username}
            </div>
            </div>
            <div>
                <div className="text-sm p-4">{findSong?.description}</div>
                <div className="flex flex-row items-center ml-1">
            <Icon icon="fluent:comment-28-filled" color="gray" />
            <div className="text-sm ml-2 text-gray-500">{filteredComments?.length} comments</div>
                </div>
            <div className="h-1 border-b-2 border-black-500 mb-2"></div>
            {!filteredComments?.length ? (<div></div>) : filteredComments.map((comments : commentsInt) => 
            <div className="flex flex-row items-center p-2" key={comments.id}>
                    <div className="flex flex-row w-96">
                    <img className="w-10 h-10" src={comments?.User?.profileImg}></img>
                    <div className="flex flex-col ml-1">
                    <div className="text-sm text-gray-600">{comments?.User?.username}</div>
                    <EditableComment prevComment={comments.body} username={comments?.User?.username} songId={id} commentId={comments.id} />
                    </div>
                    </div>
                    <div>
                    <div className="text-xs mb-5 justify-items-end">{new Date(comments.createdAt).toLocaleDateString()}</div>
                {/* <EditComment username={comments?.User?.username} songId={id} commentId={comments.id} body={comments.body}  /> */}
                <div className="flex flex-row items-center">
               {comments?.User?.username === sessionUser?.username && <button onClick={onClick}>
                <Icon icon="bi:three-dots" color="gray" width="17" />
                </button>}
                    {(comments?.User?.username === sessionUser?.username && showDelete) && <DeleteComment id={comments.id} currentComment={comments.body}/>}
                </div>
                    </div>
            </div>)}
        <div className="flex flex-row justify-center mt-10 mb-10">
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
                <img className="w-10 h-10 ml-2 mr-2" src={detail}></img>
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
        </div>
            </div>
        </div>
        </div>
    )
}


export default SongsDetail;