import { csrfFetch } from "./csrf";



//types
const getCurrentUserAlbums = '/albums/getCurrentUserAlbums'
const editAlbum = '/albums/editAlbum'
const getAlbum = '/albums/getAlbum'
const getAllAlbum = '/albums/getAllAlbum'
const createAlbum = '/albums/createAlbum'
const deleteAlbum = '/albums/deleteAlbum'


//action creators
const get_currentuser_albums = (albums : string) => {
    return {
        type: getCurrentUserAlbums,
        albums
    }
};

const edit_album = (albums : string) => {
    return {
        type: editAlbum,
        albums
    }
};

const get_album = (albums : string) => {
    return {
        type: getAlbum,
        albums
    }
};

const get_all_album = (albums : string) => {
    return {
        type: getAllAlbum,
        albums
    }
};

const create_album = (albums : string) => {
    return {
        type: createAlbum,
        albums
    }
};

const delete_album = (id : number) => {
    return {
        type: deleteAlbum,
        id
    }
};




// thunks

export const thunk_getCurrentUserAlbums = () => async (dispatch : any) => {
    const response = await csrfFetch('/api/albums/current')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_currentuser_albums(data))
        return data
    }
};

export const thunk_editAlbum = (payload : albumPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/albums/${payload.id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(edit_album(data))
        return data
    }
};

export const thunk_getAlbum = (payload : albumPayload) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/albums/${payload.id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_album(data))
    }
};

export const thunk_getAllAlbum = () => async (dispatch : any) => {
    const response = await csrfFetch('/api/albums')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_all_album(data))
    }
};

export const thunk_createAlbum = (payload : string) => async (dispatch : any) => {
    const response = await csrfFetch('/api/albums', {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(create_album(data))
        return data
    }
};

export const thunk_deleteAlbum = (id : number) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(delete_album(id))
    }
};






const initialState = {};
const albumReducer = (state = initialState, action : any) => {
    let newState : any = {...state};
    switch(action.type) {
        case getCurrentUserAlbums:
            newState = {}
            action.albums.forEach((album : albumReducer) => {
                newState[album.id] = album
            })
            return newState
        case editAlbum:
            newState[action.albums.id] = action.albums
            return newState
        case getAlbum:
            newState[action.albums.id] = action.albums
            return newState
        case getAllAlbum:
            newState = {}
            action.albums.Albums.forEach((album : albumReducer) => {
                newState[album.id] = album
            })
            return newState
        case createAlbum:
            newState[action.albums.id] = action.albums
            return newState
        case deleteAlbum:
            delete newState[action.id]
            return newState
        default:
            return state
    }
}



export default albumReducer;