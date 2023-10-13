import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunk_getASong } from "../../../store/songs";
import { thunk_getAllComments } from "../../../store/comments";
import CreateComment from "../../Comments/CreateComment";

function SongsDetail() {
        const dispatch = useDispatch();
        const { id } = useParams();   

        const sessionUser = useSelector((state : any) => state.session.user);

        const findSong = useSelector((state : any) => state.songs[id])

        const findComments = useSelector((state : any) => state.comments)
        const allComments = Object.values(findComments)



        useEffect(() => {
            dispatch(thunk_getASong(id));
            dispatch(thunk_getAllComments(id));
        },[dispatch, id]);

    return (
        <div>
        <div className="h-96 flex flex-row bg-blue-200 justify-between p-5">
            <div className="flex flex-row ">
                <div>
                    playbutton
                </div>
                <div className="flex flex-col">
                    <h1>{findSong?.title}</h1>
                    <h2>{findSong?.Artist?.username}</h2>
                </div>
            </div>
            <img className="w-80 h-80" src={findSong?.imageUrl}></img>
        </div>
        < CreateComment findSong={findSong} songId={id} userId={sessionUser?.id} />
        <div>add playlist button</div>
        <div className="flex flex-row">
            <div className="p-2">
                {findSong?.Artist?.username}
            </div>
            <div>
            <div>{allComments.length} comments</div>
            {allComments.map((comments) => 
            <div key={comments.id}>
                <div>
                    <div>{comments.User?.username}</div>
                    <div>{comments.body}</div>
                    <div>{comments.createdAt}</div>
                </div>
            </div>)}
            </div>
        </div>
        </div>
    )
}


export default SongsDetail;