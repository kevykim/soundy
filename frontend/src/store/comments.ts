import { csrfFetch } from "./csrf";


//types
const editComment = '/comments/editComment'
const deleteComment = '/comments/deleteComment'




//action creators
const edit_comment = (comment : string) => {
    return {
        type : editComment, 
        comment
    }
};


const delete_comment = (id : number) => {
    return {
        type : deleteComment,
        id
    }
};



//thunks
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
    let newState : any;
    switch (action.type) {
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






