import { useDispatch, useSelector } from "react-redux";

import { useForm, type FieldValues } from "react-hook-form"
import { thunk_createPlaylist,  thunk_getAllPlaylists } from "../../../store/playlists";



function CreatePlaylist ({closeModal}) {

    const dispatch = useDispatch();

    const sessionUser = useSelector((state : any) => state.session.user);



     const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // getValues,
  } = useForm();

    const onSubmit = async (data) => {
        const {name, imageUrl} = data

        
        await dispatch(thunk_createPlaylist({
            userId : sessionUser.id,
            name,
            imageUrl
        }))

        await dispatch(thunk_getAllPlaylists())
        
        reset();

        closeModal(false);
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96 h-64 justify-between p-10">
                         <input
            className={`focus:outline-none focus:ring-1 ${!errors?.name ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
                placeholder="Name"
              {...register("name", {
                required : "Name is required",
                maxLength : {
                    value : 30,
                    message : "Name must be less than 30 characters"
                },
              })}
               />
               {errors?.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)}
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
        </>
    )
}




export default CreatePlaylist;