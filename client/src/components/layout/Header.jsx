import React, { useEffect, useState } from 'react';
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
          className="logout w-btn w-btn-gra2 w-btn-gra-anim"
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
          className="login w-btn w-btn-gra2 w-btn-gra-anim"
        >
          {isLoginPage ? 'Sign Up' : 'Sign In'}
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
  color: #ff59c7;
  .login {
    margin-right: 30px;
    color: white;
  }
  .title {
    margin-left: 30px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
