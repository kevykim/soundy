import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch : any = useDispatch();
  const sessionUser = useSelector((state : any) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] : any = useState([]);

  if (sessionUser) return <Navigate to="/" />;

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res : Response) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="h-120 w-96 flex flex-col border-0 justify-around rounded-m pl-7 pr-7 pt-6 pb-6" onSubmit={handleSubmit}>
      <ul className="text-red-500">
        {errors.map((error : string, idx : number) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-input w-full rounded-md shadow-md`}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Username
        <input
          className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-input w-full rounded-md shadow-md`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
           className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-password w-full rounded-md shadow-md`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm Password
        <input
           className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border border-red-500"}
           form-password w-full rounded-md shadow-md`}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button className="h-12 bg-green-800 hover:bg-green-900 text-white rounded-md font-bold" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;