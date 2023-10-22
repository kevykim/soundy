import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch : any = useDispatch();
  const sessionUser = useSelector((state : any) => state.session.user);
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [errors, setErrors] : any = useState([]);

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
    getValues,
  } = useForm();

  if (sessionUser) return <Navigate to="/" />;

  const onSubmit = (data) => {

    const {email, username, password, confirmPassword} = data

    if (password === confirmPassword) {
      // setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        // .catch(async (res : Response) => {
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // });
    }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="h-120 w-96 flex flex-col border-0 justify-around rounded-m pl-7 pr-7 pt-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <ul className="text-red-500">
        {errors.map((error : string, idx : number) => <li key={idx}>{error}</li>)}
      </ul> */}
      <label>
        Email
        <input
          className={`focus:outline-none focus:ring-1 ${!errors?.email ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-input w-full rounded-md shadow-md`}
          //  type="email"
          {...register("email", {
            required: "Email is required",
            pattern : {
              value : /^\S+@\S+\.com$/,
              message : "Must be a valid email address"
            }
          })}
        />
        {errors?.email && (<p className="text-xs text-red-500">{errors.email.message}</p>)}
      </label>
      <label>
        Username
        <input
          className={`focus:outline-none focus:ring-1 ${!errors?.username ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-input w-full rounded-md shadow-md`}
          {...register("username", {
              required : "Username is required",
              maxLength : {
                value : 20,
                message : "Username must be less than 20 characters"
              }
          })}
        />
        {errors?.username && (<p className="text-xs text-red-500">{errors.username.message}</p>)}
      </label>
      <label>
        Password
        <input
           className={`focus:outline-none focus:ring-1 ${!errors?.password ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-password w-full rounded-md shadow-md`}
          type="password"
          {...register("password", {
            required : "Password is required",
            minLength : {
              value : 7, 
              message : 'Password must be longer than 7 characters'
            },
          })}
        />
        {errors?.password && (<p className="text-xs text-red-500">{errors.password.message}</p>)}
      </label>
      <label>
        Confirm Password
        <input
           className={`focus:outline-none focus:ring-1 ${!errors?.confirmPassword ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-password w-full rounded-md shadow-md`}
           type="password"
          {...register("confirmPassword", {
            required : " Confirm password is required", 
            validate : (value) => 
              value === getValues("password") || "Passwords must match",
          })}
        />
        {errors?.confirmPassword && (<p className="text-xs text-red-500">{errors.confirmPassword.message}</p>)}
      </label>
      <button className="h-12 bg-green-800 hover:bg-green-900 text-white rounded-md font-bold" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;