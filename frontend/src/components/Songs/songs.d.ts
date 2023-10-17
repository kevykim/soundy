type User = {
    username : string
}
interface commentsInt {
    id : number,
    body : string,
    createdAt : string,
    User : User
}


interface SongInt {
    title : string
    imageUrl : string
    id? : string | undefined

}


interface SongSelector {
    songs :  SongInt
}

interface EditSongInt {
    id : number
    albumId : number | null
    description : string
    url : string
    imageUrl : string
}