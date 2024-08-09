import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    const key = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (key) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error('Username and Password is required.', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Username and Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate('/');
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <p>LOGIN</p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #faf6f0;
  align-items: center;
  justify-content: center;
  width: 100%;
  form {
    p {
      color: #f4dfc8;
      text-align: center;
      font-size: 2rem;
    }
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: black;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #faf6f0;
    border-radius: 0.4rem;
    color: #f4eae4;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #f4dfc8;
      outline: none;
    }
  }
  button {
    background-color: #f4dfc8;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: black;
      color: white;
      outline: 2px solid #f4dfc8;
    }
  }
`;
