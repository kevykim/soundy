
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../context/Modal";

import { useForm, type FieldValues } from "react-hook-form"
import { thunk_createAlbum } from "../../../store/albums";
import { thunk_getArtistAlbums } from "../../../store/artists";

import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

function CreateAlbum () {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state : any) => state.session.user);


    const [showModal, setShowModal] = useState(false);


    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // getValues,
  } = useForm<FieldValues>();

    const onSubmit = async (data : FieldValues) => {
        const {title, description, year, imageUrl} = data
        

        await dispatch(thunk_createAlbum({
            
            title,
            description,
            year,
            imageUrl
        }))

        reset()

        setShowModal(false)

        await dispatch(thunk_getArtistAlbums(sessionUser?.username))
        
    }

    return (
         <>
            <button className="hover:underline text-sm mb-2 ml-2 text-center" onClick={() => setShowModal(true)}>
                 If you don't see your album, create an new album here. 
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-120 h-130 p-10 justify-between">
                      <div className="flex flex-col">
                      <div className="flex justify-end">
                      <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                      </div>
                      <h1 className="flex self-center font-semibold text-2xl mb-2">Create Album</h1>
                      </div>
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
               {errors?.title && (<p className="text-red-500 text-xs">{errors.title.message as ReactNode}</p>)}
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
               {errors?.description && (<p className="text-red-500 text-xs">{errors.description.message as ReactNode}</p>)}
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
               {errors?.year && (<p className="text-red-500 text-xs">{errors.year.message as ReactNode}</p>)}
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
                {errors?.imageUrl && (<p className="text-red-500 text-xs">{errors.imageUrl.message as ReactNode}</p>)}
                     <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" type="submit" >Submit</button>

                    </form>
                </Modal>
            )}
        </>
    )
}



export default CreateAlbum;