import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunk_createSong } from "../../../store/songs";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, type FieldValues } from "react-hook-form"
import React from "react";



function UploadSong() {
    const dispatch : any = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state : any) => state.session.user);

      const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // getValues,
  } = useForm();
    

    // const [description, setDescription] = useState('');
    // const [url, setUrl] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [errors, setErrors] = useState([]);
    // const [submitted, setSubmitted] = useState(false)
    // When a user uploads a song, should they also add information for album? 


    const onSubmit = (data : FieldValues) => {
        const {title, description, url, imageUrl} = data
         dispatch(thunk_createSong({
            title,
            description,
            url,
            imageUrl
        }))
         reset();
    }

    

    // useEffect(() => {
    //     const validation = [];
    //     if (!title.length || title.length >= 30) validation.push('Enter a title within 30 characters')

    //     setErrors(validation)
    // },[title])



    useEffect(() => {
        if (!sessionUser) {
            navigate('/')
        }
    },[navigate, sessionUser])



    return (
        <>
            <div className="flex flex-row p-2 justify-between w-60">
                <NavLink to='/upload'>Upload</NavLink>
                <NavLink to='/tracks'>Your tracks</NavLink>
                <NavLink to='/albums'>Albums</NavLink>
            </div>
            {/* {(errors.length > 0 && submitted === true) && (<div>{errors}</div>)} */}
        <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around border border-black rounded-lg p-4 shadow-lg  w-1/2 h-96">
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
            <button disabled={isSubmitting} className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 disabled:bg-gray-500 rounded" type="submit" >Submit</button>
        </form>
        </div>
        </>
    )
}




export default UploadSong