import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunk_getAllSongs } from '../../store/songs';
import { NavLink } from 'react-router-dom';
import { thunk_getAllPlaylists } from '../../store/playlists';

function Discover () {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(thunk_getAllSongs());
        dispatch(thunk_getAllPlaylists());

    },[dispatch])

    const songs = useSelector((state) => state.songs);

    const allSongs = Object.values(songs);

    const playlists = useSelector((state) => state.playlists);

    const allPlaylists = Object.values(playlists);

    const recentSongs = Object.values(songs).reverse();



    return (
        <div className="flex flex-col justify-center ">
            <div className='flex flex-row '>
            <div className='flex flex-col self-start p-4 h-full'>
            <h1 className="border-b-2 border-gray-200 pl-2 pr-2 w-full font-semibold text-3xl self-start">Discover Tracks and Playlists</h1>
            <div className='p-2'>
            <div className='flex self-start mt-3 text-2xl font-semibold'>Top Picks</div>
            <div className='flex self-start mt-5 mb-5'>
            <Splide options={{
                perPage : 5,
                gap : '1rem',
                width : '1100px',
                pagination: false,
                drag: false, 
                
            }}>
                {allSongs.map((song) => (
                        <SplideSlide key={song.id}>
                            <NavLink to={`/songs/${song.id}`}>
                                <img src={song.imageUrl}></img>
                                 <div className="text-left ml-4 mt-2 text-sm">{song?.title}</div>
                                <div className="text-left ml-4 text-sm text-gray-500">{song?.Artist?.username}</div>
                            </NavLink>
                        </SplideSlide>
                ))}

                </Splide>
            </div>
            <div className='mt-3 text-2xl font-semibold'>Top Playlists</div>
            <div className='flex self-start mt-5 mb-5'>

                 <Splide options={{
                perPage : 5,
                gap : '1rem',
                width : '1100px',
                pagination: false,
                drag: false, 
                
            }}>
                {allPlaylists.map((playlist) => (
                    
                        <SplideSlide key={playlist.id}>
                            <NavLink to={`/artists/${playlist.User.username}/playlists`}>
                                <img src={playlist.imageUrl}></img>
                                 <div className="text-left ml-4 mt-2 text-sm">{playlist?.name}</div>
                            </NavLink>
                        </SplideSlide>
                ))}

                </Splide>
            </div>
            <div className='mt-3 text-2xl font-semibold'>Recently added</div>
            <div className='flex self-start mt-5 mb-5'>
            <Splide options={{
                perPage : 5,
                gap : '1rem',
                width : '1100px',
                pagination: false,
                drag: false, 
                
            }}>
                {recentSongs.map((song) => (
                        <SplideSlide key={song.id}>
                            <NavLink to={`/songs/${song.id}`}>
                                <img src={song.imageUrl}></img>
                                 <div className="text-left ml-4 mt-2 text-sm">{song?.title}</div>
                                <div className="text-left ml-4 text-sm text-gray-500">{song?.Artist?.username}</div>
                            </NavLink>
                        </SplideSlide>
                ))}

                </Splide>
            </div>

            </div>
            </div>
            <div className='border-l-2 border-gray-200 p-2'>
                <div className='border-b-2 border-gray-200 text-sm text-gray-300 p-3'>For more Info</div>
                <div className='text-xs text-gray-300 p-2'>
                <a
                  className="hover:text-green-700 hover:underline"
                  href="https://github.com/kevykim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                &nbsp;·&nbsp;
                <a
                  className="hover:text-green-700 hover:underline"
                  href="https://linkedin.com/in/kevin-kim-a88429150"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                &nbsp;·&nbsp;
                <a
                  className="hover:text-green-700 hover:underline"
                  href="mailto:kebonkim@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
                </div>
            </div>
            </div>
        </div>
    )
}




export default Discover;