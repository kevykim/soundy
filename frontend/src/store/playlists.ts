import { csrfFetch } from "./csrf";


// types
const createPlaylist = '/playlists/createPlaylist'
const addSongToPlaylist = '/playlists/addSongToPlaylist'
const getCurrentUserPlaylists = '/playlists/getCurrentUserPlaylists'
const getPlaylist = '/playlists/getPlaylist'
const editPlaylist = '/playlists/editPlaylist'
const deletePlaylist = '/playlists/deletePlaylist'



// action creators
const create_playlist = (playlists : string) => {
    return {
        type : createPlaylist,
        playlists
    }
};

const add_song_to_playlist = (playlists : string) => {
    return {
        type : addSongToPlaylist,
        playlists
    }
};

const get_currentuser_playlists = (playlists : string) => {
    return {
        type : getCurrentUserPlaylists,
        playlists
    }
};

const get_playlist = (playlists : string) => {
    return {
        type : getPlaylist,
        playlists
    }
};

const edit_playlist = (playlists : string) => {
    return {
        type : editPlaylist,
        playlists
    }
};

const delete_playlist = (id : number) => {
    return {
        type : deletePlaylist,
        id
    }
}


// thunks
export const thunk_createPlaylist = (payload : string) => async (dispatch : any) => {
    const response = await csrfFetch('/api/playlists' , {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_playlist(data))
        return data
    }
};

export const thunk_addSongToPlaylist = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/playlists/${payload.id}/songs`, {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(add_song_to_playlist(data))
        return data
    }
};

export const thunk_getCurrentUserPlaylists = () => async (dispatch : any) => {
    const response = await csrfFetch('/api/playlists/current')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_currentuser_playlists(data))
    }
};

export const thunk_getPlaylist = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/playlists/${payload.id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_playlist(data))
    }
};

export const thunk_editPlaylist = (payload : artistPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/playlists/${payload.id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_playlist(data))
        return data
    }
};

export const thunk_deletePlaylist = (id : number) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/playlists/${id}` , {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(delete_playlist(id))
    }
}





const initialState = {};
const playlistReducer = (state = initialState, action : any) => {
    let newState : undefined | any = {...state};
    switch (action.type) {
        case createPlaylist:
            newState[action.playlists.id] = action.playlists
            return newState
        case addSongToPlaylist:
            newState[action.playlists.id] = action.playlists
            return newState
        case getCurrentUserPlaylists:
            newState = {}
            action.playlists.forEach((playlist : playlistReducer) => {
                newState[playlist.id] = playlist
            })
            return newState
        case getPlaylist:
                newState[action.playlists.id] = action.playlists
            return newState
        case editPlaylist:
            newState[action.playlists.id] = action.playlists
            return newState
        case deletePlaylist:
            delete newState[action.id]
            return newState
        default:
        return state
    }
};


export default playlistReducer;