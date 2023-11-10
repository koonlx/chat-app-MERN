import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Profile() {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    const fetchUserName = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
    };
    fetchUserName();
  }, []);

  return (
    <ProfileContainer>
        <h2>{currentUserName}</h2>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ff59c7;

`;
