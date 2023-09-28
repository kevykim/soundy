import { AppDispatch } from "../root";
import { csrfFetch } from "./csrf";

interface User {
  credential? : string
  password? : string
  email? : string
  username? : string
  firstName? : string
  lastName? : string
}

interface Action {
  type? : string
  payload? : string | number
}


const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user : string) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user : User) => async (dispatch : AppDispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user)); //data.user??
  return response;
};

export const thunkDemoUser = () => async (dispatch : AppDispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential:'Demo-lition',
      password: 'password'
    })
  })
  const data = await response.json()
  dispatch(setUser(data.user))
  return response
}

export const restoreUser = () => async (dispatch : AppDispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data?.user)); // data.user
  return response;
};

export const signup = (user : User) => async (dispatch : AppDispatch) => {
  const { username, email, password, firstName, lastName } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    // headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
};

export const logout = () => async (dispatch : AppDispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action : Action) => {
  let newState : any;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
