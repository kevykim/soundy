import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function LoginFormPage() {
  const dispatch : any = useDispatch();
  const sessionUser = useSelector((state : any) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Navigate to="/" />
  );

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res : Response) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className="h-96 w-96 flex flex-col border-0 justify-around rounded-m pl-7 pr-7 pt-6 pb-6" onSubmit={handleSubmit}>
      <ul className='text-red-500'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-input w-full rounded-md shadow-sm`}
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className={`focus:outline-none focus:ring-1 ${errors.length === 0 ? "focus:ring-green-800 focus:border-green-800" : "focus:ring-red-500 focus:border-red-500 border-2 border-red-500"}
           form-password w-full rounded-md shadow-sm`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="h-12 bg-green-800 hover:bg-green-900 text-white rounded-md font-bold" 
      type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;