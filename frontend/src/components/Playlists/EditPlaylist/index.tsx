



import {     useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "../../../context/Modal";

import { useForm, type FieldValues } from "react-hook-form"
import { thunk_editPlaylist, thunk_getAllPlaylists } from "../../../store/playlists";



function EditPlaylist ({playlistId}) {
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const findPlaylists = useSelector((state) => state.playlists)

    const playlists = Object.values(findPlaylists)

    const currentPlaylist = playlists.filter((playlist) => playlist.id === playlistId)

    const playlist = currentPlaylist[0]

     const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
    // getValues,
  } = useForm({
    defaultValues : {
        id : playlistId,
        userId : playlist.userId,
        name : playlist.name,
        imageUrl : playlist.imageUrl,
    }
  });

    const onSubmit = async (data) => {
        const {name, imageUrl} = data

        
        await dispatch(thunk_editPlaylist({
            id : playlistId,
            userId : playlist.userId,
            name,
            imageUrl
        }))

        dispatch(thunk_getAllPlaylists())
        
        setSubmitted(true)
        setShowModal(false)
    }



    return (
        <>
            <button className="flex flex-row justify-between mb-3 ml-2 p-1 items-center border border-gray-500 w-14" onClick={() => setShowModal(true)}>
                <Icon icon="icon-park-outline:edit-two" color="gray" width="17" />
                <div className="text-xs">Edit</div>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-750 h-120 p-10">
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
               {errors?.title && (<p className="text-red-500 text-xs">{errors.title.message}</p>)}
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
                </Modal>
            )}
        </>
    )
}




export default EditPlaylist;