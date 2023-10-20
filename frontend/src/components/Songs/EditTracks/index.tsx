
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunk_editSong, thunk_getASong } from "../../../store/songs";
import React from "react";

import { useForm, type FieldValues } from "react-hook-form"


function EditTracks () {
    type idType = {
        id? : string 
    }
    
    const {id} = useParams<idType>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

        useEffect(() => {
            dispatch(thunk_getASong(id))
        }, [dispatch, id])

    
    const currentTrack = useSelector((state : SongSelector) => state.songs[id])

    
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        const {title, description, url, imageUrl} = data

        setSubmitted(true)
         dispatch(thunk_editSong({
            id,
            albumId : currentTrack?.albumId || albumId || null,
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
        <div className="flex flex-row p-2 justify-between w-60">
                <NavLink to='/upload'>Upload</NavLink>
                <NavLink to='/tracks'>Your tracks</NavLink>
                <NavLink to='/albums'>Albums</NavLink>
            </div>
            <div className="flex flex-col justify-center items-center h-screen">
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
            <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" type="submit" >Submit</button>
        </form>
            </div>
        </>
    )
}






export default EditTracks;