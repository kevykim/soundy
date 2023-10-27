import { csrfFetch } from "./csrf";

// types
const getArtist = '/artists/getArtist'
const getArtistSongs = '/artists/getArtistSongs'
const getArtistPlaylists = '/artists/getArtistPlaylists'
const getArtistAlbums = '/artists/getArtistAlbums'


//action creators
const get_artist = (artist : string) => {
    return {
        type: getArtist,
        artist
    }
};

const get_artist_songs = (artist : string) => {
    return {
        type: getArtistSongs,
        artist
    }
};

const get_artist_playlists = (artist : string) => {
    return {
        type: getArtistPlaylists,
        artist
    }
};

const get_artist_albums = (artist : string) => {
    return {
        type: getArtistAlbums,
        artist
    }
};





//thunks
export const thunk_getArtist = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/artists/${payload}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_artist(data))
    }
};

export const thunk_getArtistSongs = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/artists/${payload}/songs`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_artist_songs(data))
    }
};

export const thunk_getArtistPlaylists = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/artists/${payload.id}/playlists`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_artist_playlists(data))
    }
};

export const thunk_getArtistAlbums = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/artists/${payload.id}/albums`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_artist_albums(data))
    }
};





const initialState = {}
const artistReducer = (state = initialState, action : any) => {
    let newState : any = {...state};
    switch (action.type) {
        case getArtist:
            newState[action.artist.id] = action.artist
            return newState
        case getArtistSongs:
            newState = {}
            action.artist.forEach((artist : artistReducer) => {
                newState[artist.id] = action.artist
            })
            return newState
        case getArtistPlaylists:
            newState = {}
            action.artists.forEach((artist : artistReducer) => {
                newState[artist.id] = action.artist
            })
            return newState
        case getArtistAlbums:
            newState = {}
            action.artists.forEach((artist : artistReducer) => {
                newState[artist.id] = action.artist
            })
            return newState
        default:
            return state
    }
}

export default artistReducer;