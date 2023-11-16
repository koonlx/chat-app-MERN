import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import '../../sources/css/button.css';
// import { logoutRoute } from '../../utils/APIRoutes';
// import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();

  const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
  const user = JSON.parse(userData);
  // console.log(user)

  const [isLoginPage, setIsLoginPage] = useState(true);

  const handlePage = () => {
    if (isLoginPage === true) setIsLoginPage(false);
    if (isLoginPage === false) setIsLoginPage(true);
  };

  return (
    <HeaderContainer>
      <div className="title">Chat App</div>
      {user ? (
        <button
          className="logout"
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </button>
      ) : (
        <Link
          to={isLoginPage ? '/register' : '/login'}
          onClick={handlePage}
          className="login"
        >
          <button>
          {isLoginPage ? 'Sign Up' : 'Sign In'}
          </button>
        </Link>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  height: 75px;
  color: #F4DFC8;

  button {
    border: none;
    border-radius: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #f4eae0;
    color: black;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: black;
      color: white;
      outline: 2px solid #f4dfc8;
    }
  }
  .login {
    margin-right: 30px;
    /* color: #F4DFC8; */
  }
  .title {
    margin-left: 30px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
