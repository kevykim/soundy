import { csrfFetch } from "./csrf";
import { AppDispatch } from "../root";

//types
const editComment = '/comments/editComment'
const deleteComment = '/comments/deleteComment'
const createComment = '/comments/createComment'
const getAllComments = '/comments/getAllComments'



//action creators
const create_comment = (comments : string) => {
    return {
        type : createComment,
        comments
    }
};

const get_all_comments = (comments : string) => {
    return {
        type : getAllComments,
        comments
    }
};

const edit_comment = (comments : string) => {
    return {
        type : editComment, 
        comments
    }
};

const delete_comment = (id : number) => {
    return {
        type : deleteComment,
        id
    }
};



//thunks
export const thunk_createComment = (payload : any) => async (dispatch : AppDispatch) => {
    const response = await csrfFetch(`/api/songs/${payload.songId}/comments`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(create_comment(data))
    }
}


export const thunk_getAllComments = (songId : number) => async (dispatch : AppDispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`)

    if (response.ok) {
        const data = await response.json()
        dispatch(get_all_comments(data))
    }
}


export const thunk_editComment = (payload : any) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/comments/${payload.id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_comment(data))
        return data
    }
};


export const thunk_deleteComment = (id : number) => async (dispatch : any) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(delete_comment(id))
    }
}



const initialState = {}
const commentReducer = (state = initialState, action : any) => {
    let newState : any = {...state}
    switch (action.type) {
        case createComment: 
        newState[action.comments.id] = action?.comments
        return newState
        case getAllComments:
         newState = {}
            action.comments.forEach((comments : any) => {
                newState[comments.id] = comments
            })
            return newState
        case editComment :
            newState[action.comments.id] = action.comments
            return newState
        case deleteComment :
            delete newState[action.id]
            return newState
        default :
        return state
    }
}





export default commentReducer;






