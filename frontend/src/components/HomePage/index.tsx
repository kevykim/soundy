import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getAllSongs } from "../../store/songs";
import { NavLink } from "react-router-dom";
import SignUpModal from "../SignUpModal.ts";
import LoginFormModal from "../LoginModal";

import {Icon} from '@iconify/react'
import homepageImageOne from '../../public/assets/homepageimageone.jpg'
import { thunk_getAllArtists } from "../../store/artists.ts";

type ArtistType = {
    username : string
}
interface songInterface {
    id : number
    imageUrl : string
    userId : number
    title : string
    Artist : ArtistType
}


function HomePage () {
    const dispatch = useDispatch();
  const loggedIn = useSelector((state : any) => state.session.user);


  const songs = useSelector((state : any) => state.songs)
  const allSongs : songInterface[] = Object.values(songs).slice(0,5)
//   const currentUserSongs = allSongs.filter((song) => song?.userId === loggedIn?.id)

const artists = useSelector((state) => state.artist)
const allArists = Object.values(artists)


useEffect(() => {
    dispatch(thunk_getAllSongs())
    dispatch(thunk_getAllArtists())
}, [dispatch])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center relative w-full">
            <img className="h-130 w-full relative" src={homepageImageOne}></img>
            <div className="absolute z-20 flex flex-col justify-center items-center text-white mt-10 mb-20">
                <div className="text-5xl font-semibold mb-8 shadow-2xl">Soundy leads the way in the future of music</div>
                <div className="text-2xl shadow-xl">Start your journey by uploading your first track on Soundy.  
                     </div>
                    <div className="text-2xl shadow-xl">
                        Create, discover fans, and connect
                    </div>
                    <div className="text-2xl shadow-xl"> with fellow artists in a supportive space.</div>
            </div>
            </div>
        {!loggedIn ?  <div className="flex flex-col items-center justify-center">
            <div className="text-2xl text-center font-medium pt-8 mb-8">
                 Hear what's trending for free in the Soundy community</div>
                <div className="flex flex-wrap justify-center  mb-8">
            {allSongs.map((song : songInterface) => <div key={song?.id}>
                <NavLink className="flex flex-col items-center justify-center relative group" to={`/songs/${song?.id}`}>
                <Icon className="absolute hidden group-hover:block justify-center items-center" icon="zondicons:play-outline" color="green" width="130"/>
                <img className="w-48 h-48 ml-4 mr-4 shadow-lg" src={song?.imageUrl} alt="song_image" ></img>
                </NavLink>
                 <div className="text-left ml-4 mt-2 text-sm">{song?.title}</div>
                <div className="text-left ml-4 text-sm text-gray-500">{song?.Artist?.username}</div>
            </div>)}
                </div>
            <NavLink className='bg-green-600 hover:bg-green-700 p-2 w-60 text-center text-white mb-8 mt-8' to={'/discover'}>
                Explore what's trending
            </NavLink>
                    <div className="flex flex-col items-center justify-center">
                         <div className="text-4xl font-small mb-3">Thanks for listening. Now join in.</div>
                        <div className="text-2xl mb-12">
                            Save tracks, follow artists and build playlists. All for free
                        </div>
                        <SignUpModal />
                        <div className="flex flex-row justify-between w-64 mt-4 mb-24">
                            <div> Already have an account? </div>
                            <LoginFormModal />
                        </div>
                    </div>
            </div>
            : 
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl text-center font-medium shadow-sm pt-8 mb-8">
                 Soundy Picks</div>
            <div className="flex flex-wrap justify-between mb-8">    
                {allSongs.map((song : songInterface) => <div key={song?.id}>
                    <NavLink className="flex flex-col justify-center items-center relative group" to={`/songs/${song?.id}`}>
                    <Icon className="absolute hidden group-hover:block justify-center items-center" icon="zondicons:play-outline" color="green" width="130"/>
                <img className="w-48 h-48 ml-4 mr-4 shadow-lg" src={song?.imageUrl} alt="song_image"  ></img>
                    </NavLink>
                    <div className="text-left ml-4 mt-2 text-sm">{song?.title}</div>
                    <div className="text-left ml-4 text-xs text-gray-500">{song?.Artist?.username}</div>
                </div>)}
            </div>
                <div className="text-2xl text-center font-medium shadow-sm pt-8 mb-8">
                    Artists You Should Know
                </div>
                    <div className="flex flex-wrap justify-between mb-8">    
                {allArists.map((artist) => <div key={artist?.id}>
                    <NavLink className="flex flex-col justify-center items-center relative group" to={`/artists/${artist?.username}`}>
                <img className="w-48 h-48 ml-4 mr-4 shadow-lg" src={artist?.profileImg} alt="song_image"  ></img>
                    </NavLink>
                    <div className="text-left ml-4 mt-2 text-sm">{artist?.username}</div>
                </div>)}
            </div>
            <NavLink className='bg-green-600 hover:bg-green-700 p-2 w-60 text-center text-white mb-8 mt-8' to={'/discover'}>
                Explore what's trending
            </NavLink>
            {/* Your playlists */}
            </div>}
        </div>
    )
}







export default HomePage