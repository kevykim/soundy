
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunk_editSong, thunk_getASong } from "../../../store/songs";
import LoginFormModal from "../../LoginModal";
import React from "react";

import { useForm, type FieldValues, Controller } from "react-hook-form"

import detail from '../../../public/assets/detail.png'
import { thunk_getArtistAlbums } from "../../../store/artists";



function EditTracks () {
    type idType = {
        id? : string 
    }
    
    const {id} = useParams<idType>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUser = useSelector((state : any) => state.session.user);
    
    // useEffect(() => {
    //     if (!sessionUser) {
    //         navigate('/')
    //     }
    // },[navigate, sessionUser])
    

        useEffect(() => {
            dispatch(thunk_getASong(id))
            dispatch(thunk_getArtistAlbums(sessionUser?.username))
        }, [dispatch, id, sessionUser?.username])

    
    const currentTrack = useSelector((state : SongSelector) => state.songs[id])

    const findArtistAlbums = useSelector((state) => state.artist)

    const allArtistAlbums = Object.values(findArtistAlbums);  
    
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
    // reset,
    // getValues,
  } = useForm({
    defaultValues : {
        id,
        albumId : currentTrack?.albumId || null,
        title : currentTrack?.title,
        description : currentTrack?.description,
        url : currentTrack?.url,
        imageUrl : currentTrack?.imageUrl
    }
  });
    // const [editTitle, setTitle] = useState<string>(title);
    // const [editDescription, setDescription] = useState<string>(description);
    // const [editUrl, setUrl] = useState<string>(url);
    // const [editImageUrl, setImageUrl] = useState<string>(imageUrl);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data : FieldValues) => {
        const {title, description, url, imageUrl, albumId} = data

        setSubmitted(true)
         dispatch(thunk_editSong({
            id,
            albumId : albumId,
            title ,
            description: description,
            url: url,
            imageUrl: imageUrl
        }));

        }
        
        if (submitted) {
            navigate('/tracks')
        }


        
    return (
        <>
        {!sessionUser ? (
            <div className="flex justify-center items-center h-screen mt-5">
        <div className="flex flex-col justify-center items-center mt-4">
            <div className="text-xl font-bold">
            Want to see more? 
            </div>
        <div className="text-4xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-40 text-center rounded shadow-sm"><LoginFormModal /> </div>
        </div>
        </div>
        ) 
        : (sessionUser?.id !== currentTrack?.userId) ? (
        <div className="flex justify-center items-center h-screen mt-5">
            <div className="flex flex-col justify-center items-center mt-4">
            <div className="text-xl font-bold">
                You can only edit your tracks
            </div>
                <NavLink className="text-4xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-80 text-center rounded shadow-sm" to={'/tracks'}>Click here to your tracks</NavLink>
            </div>
        </div>) 
        : ( 
        <>
        <div className="flex flex-row p-4 z-10 justify-between w-64 h-14">
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/upload'>Upload</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/tracks'>Your tracks</NavLink>
                <NavLink className="hover:border-b-2 border-green-800 hover:text-green-800 h-11" to='/albums'>Albums</NavLink>
            </div>
            <div className="h-1 border-b-2 border-black-500 mb-2"></div>
            <div className="flex flex-col justify-center items-center mt-4">
            <h1 className="text-3xl font-bold mb-4">Edit your track</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around border border-black rounded-lg p-4 w-1/2 h-96">
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
             className={`focus:outline-none focus:ring-1 ${!errors?.imageUrl ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
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
            <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" type="submit" >Submit</button>
        </form>
            </div>
            </>
        )}
        <div className="flex flex-row justify-center mt-24 mb-10">
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
                <img className="w-10 h-10 ml-2 mr-2" src={detail}></img>
                <div className="border-b border-gray-300 border-solid h-5 w-60"></div>
        </div>
        </>
    )
}






export default EditTracks;