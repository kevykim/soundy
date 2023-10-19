import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunk_getASong } from "../../../store/songs";
import { thunk_getAllComments } from "../../../store/comments";
import CreateComment from "../../Comments/CreateComment";
import EditComment from "../../Comments/EditComment";
import DeleteComment from "../../Comments/DeleteComment";
import CommentModal from "../../LoginModal/comment";

import AudioPlayer from 'react-h5-audio-player'
import {Icon} from '@iconify/react'


function SongsDetail() {
        const dispatch = useDispatch();
        const { id } = useParams();   

        const sessionUser = useSelector((state : any) => state.session.user);

        const findSong = useSelector((state : SongSelector) => state.songs[id])

        const findComments = useSelector((state : any) => state.comments)
        const allComments : commentsInt[] = Object.values(findComments)


        useEffect(() => {
            dispatch(thunk_getASong(id));
            dispatch(thunk_getAllComments(id));
        },[dispatch, id]);

    return (
        <div>
        <div className="h-96 flex flex-row bg-blue-200 justify-between p-5">
            <div className="flex flex-row ">
                <div>
                    <AudioPlayer 
                        className="p-2"
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
                            play : <Icon icon="zondicons:play-outline" color="green" width="70"/>,
                            pause : <Icon icon="zondicons:pause-solid" color="green" width="70"/>
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <h1>{findSong?.title}</h1>
                    <h2>{findSong?.Artist?.username}</h2>
                </div>
            </div>
            <img className="w-80 h-80" src={findSong?.imageUrl}></img>
        </div>
        {!sessionUser ? (
        <div className="bg-gray-200 p-1">
            <CommentModal />
        </div>) :
         (sessionUser && sessionUser?.id !== findSong?.userId) && 
         (< CreateComment findSong={findSong} songId={id} userId={sessionUser?.id} username={sessionUser?.username}/>)}
        <div>add playlist button</div>
        <div className="flex flex-row">
            <div className="p-2">
                {findSong?.Artist?.username}
            </div>
            <div>
            <div>{allComments.length} comments</div>
            {allComments.map((comments : commentsInt) => 
            <div className="flex flex-row" key={comments.id}>
                <div className="flex flex-col">
                    <div>{comments?.User?.username}</div>
                    <div>{comments.body}</div>
                </div>
                    <div>{comments.createdAt}</div>
                <EditComment username={comments?.User?.username} songId={id} commentId={comments.id} body={comments.body}  />
                <DeleteComment id={comments.id} />
            </div>)}
            </div>
        </div>
        </div>
    )
}


export default SongsDetail;