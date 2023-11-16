import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const key = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (key) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    if (password !== confirmPassword) {
      toast.error(
        'Password and confirm password should be same.',
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        'Username should be greater than 3 characters.',
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(registerRoute, {
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
        <p>REGISTER</p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #FAF6F0;
  align-items: center;
  justify-content: center;
  width: 100%;
  p {
    color: #FAF6F0;
    text-align: center;
    font-size: 2rem;
  }
  form {
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
    border: 0.1rem solid #FAF6F0;
    border-radius: 0.4rem;
    color: #f4eae4;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #F4DFC8;
      outline: none;
    }
  }
  button {
    background-color: #F4DFC8;
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
      outline: 2px solid #F4DFC8;
    }
  }
`;
