
import { useDispatch, useSelector } from "react-redux"
import { thunk_createSong } from "../../../store/songs";
import { NavLink } from "react-router-dom";
import { useForm, type FieldValues, Controller } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";
import LoginFormModal from "../../LoginModal";
import React, { useEffect } from "react";

import detail from '../../../public/assets/detail.png'
import { thunk_getArtistAlbums } from "../../../store/artists";
import CreateAlbum from "../../Albums/CreateAlbum";

function UploadSong() {
    const dispatch : any = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state : any) => state.session.user);

      const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    // getValues,
  } = useForm();
    

    // const [description, setDescription] = useState('');
    // const [url, setUrl] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [errors, setErrors] = useState([]);
    // const [submitted, setSubmitted] = useState(false)
    // When a user uploads a song, should they also add information for album? 

    useEffect(() => {
        dispatch(thunk_getArtistAlbums(sessionUser?.username))
    },[dispatch, sessionUser?.username])
    const findArtistAlbums = useSelector((state) => state.artist)

    const allArtistAlbums = Object.values(findArtistAlbums);    



    const onSubmit = async (data : FieldValues) => {
        const {title, description, url, imageUrl, albumId} = data
         const createdsong = await dispatch(thunk_createSong({
            albumId,
            title,
            description,
            url,
            imageUrl
        }))
         reset();
         navigate(`/songs/${createdsong.id}`)
    }

    // useEffect(() => {
    //     const validation = [];
    //     if (!title.length || title.length >= 30) validation.push('Enter a title within 30 characters')

    //     setErrors(validation)
    // },[title])

    const location = useLocation();
    const currenthPath = location.pathname;

    // console.log(currenthPath)



    return (
        <>
        {!sessionUser ? 
        <div className="flex justify-center items-center h-screen mt-5">
        <div className="flex flex-col justify-center items-center mt-4">
            <div className="text-xl font-bold">
            Want to see more? 
            </div>
        <div className="text-4xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-40 text-center rounded shadow-sm"><LoginFormModal /> </div>
        </div>
        </div> 
        : <>
            <div className="flex flex-row p-4 z-10 justify-between w-64 h-14">
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/upload'>Upload</NavLink>
            </div>
            <div className="h-1 border-b-2 border-black-500 mb-2"></div>
            {/* {(errors.length > 0 && submitted === true) && (<div>{errors}</div>)} */}
        <div className="flex flex-col justify-center items-center mt-4">
            <h1 className="text-3xl font-bold mb-4">Upload your track</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around border border-black rounded-lg p-4 shadow-lg  w-1/2" style={{height: "450px"}}>
            <input
            className={`focus:outline-none focus:ring-1 ${!errors?.title ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
              placeholder="Title"
               {...register("title", {
                required : "Title is required",
                maxLength : {
                    value : 30,
                    message : "Title must be less than 30 characters"
                },
               })} 
               />
                {errors?.title && (<p className="text-red-500 text-xs">{errors.title.message}</p>)}
            <input
            className={`focus:outline-none focus:ring-1 ${!errors?.description ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
              placeholder="Description"
               {...register("description", {
                required : "Description is required",
                maxLength : {
                    value : 30,
                    message : "Description must be less than 30 characters"
                }
               })}
               />
                {errors?.description && (<p className="text-red-500 text-xs">{errors.description.message}</p>)}
            <input
            className={`focus:outline-none focus:ring-1 ${!errors?.url ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
              placeholder="Song url"
               {...register('url', {
                required : "Song url is required",
                pattern : {
                    value : /^(?=.*mp3)(?=.*\.com)/,
                    message : "Must be a valid url"
                }
               })}
               />
                {errors?.url && (<p className="text-red-500 text-xs">{errors.url.message}</p>)}
            <input
            className={`focus:outline-none focus:ring-1 ${!errors.imageUrl ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
              placeholder="Image url"
               {...register('imageUrl', {
                required : "Image url is required",
                 pattern : {
                    value: /\.com.*\.(jpeg|png|gif)/,
                    message: "Must be a valid url"
                }
               })}
               />
                {errors?.imageUrl && (<p className="text-red-500 text-xs">{errors.imageUrl.message}</p>)}
               <Controller
          name="albumId"
          control={control}
          defaultValue="" 
          rules={{ required: 'Please select an album' }} 
          render={({ field }) => (
              <select {...field} 
              className={`focus:outline-none focus:ring-1 ${!errors.albumId ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
              form-input w-full rounded-md shadow-sm`}
              >
              <option value="" disabled>
                Select an album
              </option>
                {allArtistAlbums.map((album) => (
                    <option key={album.id} value={album.id}>
                        {album.title}
                    </option>
                    ))}
            </select>
          )}
        />
                {errors?.albumId && (<p className="text-red-500 text-xs">{errors.albumId.message}</p>)}
          <CreateAlbum />
            <button disabled={isSubmitting} className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 disabled:bg-gray-500 rounded" type="submit" >Submit</button>
        </form>
        </div>
        </>}
        <div className="flex flex-row justify-center mt-24 mb-10">
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
                <img className="w-10 h-10 ml-2 mr-2" src={detail}></img>
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
        </div>
        </>
    )
}




export default UploadSong