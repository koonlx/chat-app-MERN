import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../sources/css/dashboard.css';
import RoomList from '../components/dashboard/RoomList';
import Chat from '../components/dashboard/Chat';
import Undefined from '../components/dashboard/Undefined';
import { useNavigate } from 'react-router-dom';

import { io } from 'socket.io-client';
import { host } from '../utils/APIRoutes';

export default function Dashboard() {
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (!data) {
        navigate('/login');
      }
      setCurrentUser(data);
    };
    fetchUser();
  }, []);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  useEffect(() => {
    setSocket(io(host));
  }, []);

  useEffect(() => {
    if (currentUser) socket.emit('login', currentUser._id);
  }, [currentUser, socket]);

  return (
    <DashboardContainer>
      <RoomList socket={socket} onRoomSelected={handleRoomSelection} />
      {selectedRoom === undefined ? (
        <Undefined />
      ) : (
        <Chat
          socket={socket}
          selectedRoom={selectedRoom}
          currentUser={currentUser}
        />
      )}
    </DashboardContainer>
  );
}

const DashboardContainer = styled.main`
  display: flex;
  flex-direction: row;
  height: 80vh;
  width: 100%;
  align-items: stretch;
`;
