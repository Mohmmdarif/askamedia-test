import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import staticCredential from '../mocks/credentials.json';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const isValidCredential = validateCredential(email, password);
    if (isValidCredential) {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('userData', JSON.stringify({
        email: staticCredential.email,
        fullname: staticCredential.fullname,
        phone: staticCredential.phone,
        address: staticCredential.address,
        profile_picture: staticCredential.profile_picture
      }));
      navigate('/');
    }
  }

  const validateCredential = (email, password) => {
    if (email === staticCredential.email && password === staticCredential.password) {
      return true;
    } else {
      if (email !== staticCredential.email) {
        setError('Invalid email!, Please try again.');
      } else if (password !== staticCredential.password) {
        setError('Invalid password!, Please try again.');
      } else {
        setError('Invalid email or password!, Please try again.');
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-sm md:max-w-md bg-white shadow-md rounded-xl p-5 md:p-10 mx-5 space-y-5'>
        <div>
          <h1 className='text-2xl font-bold'>Login</h1>
          <p className='text-base mt-3'>Sign in to your account to get full access.</p>
        </div>
        <form className='space-y-2' onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className='flex flex-col space-y-2'>
            <label className='text-base'>Email</label>
            <input type="email" id='email' name='email' autoComplete="email" className='outline outline-1 -outline-offset-1 outline-gray-300 px-3 py-1.5 rounded-md focus:outline-orange-500 focus:outline-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-base'>Password</label>
            <input type="password" id='password' name='password' autoComplete='current-password' className='outline outline-1 -outline-offset-1 outline-gray-300 px-3 py-1.5 rounded-md focus:outline-orange-500 focus:outline-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div>
            <button type='submit' className='w-full bg-orange-500 px-3 py-1.5 rounded-md text-white font-semibold text-base mt-5 hover:bg-orange-400'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
