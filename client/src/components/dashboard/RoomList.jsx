import React, { useEffect, useState, useCallback } from 'react';
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

   const fetchRooms = useCallback(async () => {
      try {
         const { data } = await axios.get(getRoomRoute, {
            params: { userId: user._id },
         });
         setRoomList(data.rooms);
      } catch (error) {
         console.error('Error fetching rooms:', error);
      }
   }, [user._id]);

   const handleRoomClick = room => {
      setSelectedRoom(room);
      onRoomSelected(room);
   };

   const handleInputChange = event => {
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
         }
      } else {
         toast.error(data.message, toastOptions);
      }
      setRoomName('');
   };

   useEffect(() => {
      fetchRooms();
   }, [fetchRooms]);

   return (
      <RoomListContainer>
         <Profile />
         <div className='border_bottom'>
            <form onSubmit={e => e.preventDefault()}>
               <input type='text' placeholder='input room name' value={roomName} onChange={handleInputChange} />
               <button className='cre-r-btn' onClick={handleCreateRoom}>
                  Create Room
               </button>
            </form>
         </div>
         <div className='border_bottom room-list'>
            <h2>Room List</h2>
            <ul className='item'>
               {roomList.map(room => (
                  <li
                     key={room._id}
                     onClick={() => handleRoomClick(room)}
                     className={room === selectedRoom ? 'selected' : ''}>
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
   color: #f4dfc8;
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   border-top: 1px solid #f4dfc8;
   border-left: 1px solid #f4dfc8;
   border-bottom: 1px solid #f4dfc8;

   input {
      width: 90%;
      margin-left: 20px;
      border: none;
      border-radius: 20px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-right: 5px;
      outline: none;

      ::placeholder {
         color: #999;
      }
   }
   .cre-r-btn {
      width: 90%;
      border: none;
      border-radius: 20px;
      padding-top: 5px;
      padding-bottom: 5px;
      background-color: #f4eae0;
      color: black;
      cursor: pointer;
      outline: none;
   }

   button {
      width: 10%;
      border: none;
      border-radius: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
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

   .border_bottom {
      border-bottom: 1px solid #f4dfc8;
      padding: 10px;
   }
   .item {
      cursor: pointer;
   }
   .selected {
      background-color: #f4dfc8;
      color: black;
   }
   .flex-item:last-child {
      border-bottom: none;
   }
`;
