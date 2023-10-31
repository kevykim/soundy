import {     useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "../../../context/Modal";

import { useForm, type FieldValues } from "react-hook-form"
import { thunk_editAlbum, thunk_getAllAlbum } from "../../../store/albums";


function EditAlbum ({albumId}) {
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const findAlbums = useSelector((state) => state.albums)

    const albums = Object.values(findAlbums)

    const currentAlbum = albums.filter((album) => album.id === albumId)

    const album = currentAlbum[0]

     const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // getValues,
  } = useForm({
    defaultValues : {
        id : albumId,
        userId : album.userId,
        title : album.title,
        description : album.description,
        year : album.year,
        imageUrl : album.imageUrl,
    }
  });

    const onSubmit = async (data) => {
        const {title, description, year, imageUrl} = data

        
        await dispatch(thunk_editAlbum({
            id : albumId,
            userId : album.userId,
            title,
            description,
            year,
            imageUrl
        }))

        dispatch(thunk_getAllAlbum())
        
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
                },
              })}
               />
               {errors?.description && (<p className="text-red-500 text-xs">{errors.description.message}</p>)}
                <input
            className={`focus:outline-none focus:ring-1 ${!errors?.year ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
                placeholder="Year"
              {...register("year", {
                required : "Year is required",
                pattern : {
                    value : /^[0-9]*$/,
                    message : "Must be a number"
                },
                maxLength : {
                    value : 4,
                    message : "Year must be less than 4 characters"
                },
              })}
               />
               {errors?.year && (<p className="text-red-500 text-xs">{errors.year.message}</p>)}
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




export default EditAlbum;