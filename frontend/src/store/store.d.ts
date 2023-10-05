// interface songPayload {
//     id : number
//     title : string
//     description : string
//     url : string
//     imageUrl : string
//     userId : number
//     albumId : number
// }

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

interface albumPayload {
    id : number
}

type albumReducer = {
    id : number
    album : string
}


interface artistPayload {
    id : number
}


type artistReducer = {
    artist : string
    id : number
}

interface playlistsPayload {
    id : number
}


type playlistReducer = {
    id : number
    album : string
}