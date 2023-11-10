import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import axios from 'axios';
import { roomRoute, getRoomRoute } from '../../utils/APIRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RoomList({ socket, onRoomSelected }) {
  const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
  const user = JSON.parse(userData);

  //error message layout
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(getRoomRoute, {
        params: { userId: user._id },
      });
      setRoomList(data.rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    onRoomSelected(room);
  };

  const handleInputChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = async () => {
    // request create room to backend
    const { data } = await axios.post(roomRoute, { user, roomName });
    if (data.status === true) {
      toast.success(data.message, toastOptions);
      fetchRooms();
      if (socket) {
        socket.emit('login', user._id);
        socket.emit('join-room', onRoomSelected, user.username);
      }
    } else {
      toast.error(data.message, toastOptions);
    }
    setRoomName('');
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <RoomListContainer>
      <Profile />
      <div className="border_bottom">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="input room name"
            value={roomName}
            onChange={handleInputChange}
          />
          <button onClick={handleCreateRoom}>Create Room</button>
        </form>
      </div>
      <div className="border_bottom room-list">
        <h2>Room List</h2>
        <ul className="item">
          {roomList.map((room) => (
            <li
              key={room._id}
              onClick={() => handleRoomClick(room)}
              className={room === selectedRoom ? 'selected' : ''}
            >
              {room.name}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </RoomListContainer>
  );
}

const RoomListContainer = styled.div`
  background-color: black;
  color: #ff59c7;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .border_bottom {
    border-bottom: 1px solid #ff59c7;
    padding: 10px;
  }
  .item {
    cursor: pointer;
  }
  .selected {
    background-color: #ff59c7;
    color: black;
  }
  .flex-item:last-child {
    border-bottom: none;
  }
`;
