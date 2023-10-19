import { csrfFetch } from "./csrf";
import { AppDispatch } from "../root";

// types
const createSong = '/songs/createSong'
const getAllSongs = '/songs/getAllSongs'
const getCurrentUserSongs = '/songs/getCurrentUserSongs'
const getASong = '/songs/getASong'
const editSong = '/songs/editSong'
const deleteSong = '/songs/deleteSong'

// action creators
const create_song = (songs : string) => {
    return {
        type : createSong,
        songs
    }
};

const get_all_songs = (songs : string) => {
    return {
        type : getAllSongs,
        songs
    }
};

const get_currentuser_songs = (songs : string) => {
    return {
        type : getCurrentUserSongs,
        songs
    }
};

const get_a_song = (songs : string) => {
    return {
        type : getASong,
        songs
    }
};

const edit_song = (songs : string) => {
    return {
        type : editSong,
        songs
    }
};

const delete_song = (id : number) => {
    return {
        type : deleteSong,
        id
    }
}

interface CreateSongInt {
    title : string
    description : string
    url : string
    imageUrl : string
}

// thunks
export const thunk_createSong = (payload : CreateSongInt) => async (dispatch : AppDispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(create_song(data))
        return data;
    }
};


// why does AppDispatch interface not work? 
export const thunk_getAllSongs = () => async (dispatch : any) => {
    const response = await csrfFetch('/api/songs')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_all_songs(data.Songs))
    }
}


export const thunk_getCurrentUserSongs = () => async (dispatch : any) => {
    const response = await csrfFetch('/api/songs/current')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_currentuser_songs(data))
    }
}


export const thunk_getASong = (id : string) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/songs/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(get_a_song(data))
    }
}


export const thunk_editSong = (payload : EditSongInt) => async (dispatch : AppDispatch) => {
    const response = await csrfFetch(`/api/songs/${payload.id}` , {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_song(data))
        return data
    }
}


export const thunk_deleteSong = (id : number) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/songs/${id}` , {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(delete_song(id))
    }
}

const initialState = {};

const songReducer = (state = initialState, action : any) => {
let newState : any = {...state};
switch(action.type) {
    case createSong:
        newState[action.songs.id] = action.songs
        return newState
    case getAllSongs:
         newState = {}
         action.songs.forEach((songs : any) => {
            newState[songs.id] = songs
         })
            return newState
    case getCurrentUserSongs: 
         newState = {}
         action.songs.forEach((songs : any) => {
            newState[songs.id] = songs
         })
         return newState
    case getASong:
        newState = {};
         newState[action.songs.id] = action.songs
         return newState
    case editSong:
         newState[action.songs.id] = action.songs
         return newState
    case deleteSong: 
         delete newState[action.id]
         return newState
    default:
        return state;
}
};



export default songReducer;