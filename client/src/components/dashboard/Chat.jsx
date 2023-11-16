import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  getMessagesRoute,
  sendMessageRoute,
  leaveRoomRoute,
} from '../../utils/APIRoutes';
import ChatForm from './InputForm';
import { ToastContainer, toast } from 'react-toastify';

export default function Chat({ socket, selectedRoom, currentUser }) {
  const [chat, setChat] = useState([]);
  const room = selectedRoom;
  const roomId = room._id;
  const userId = currentUser._id;
  const scrollRef = useRef();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(getMessagesRoute, {
        params: { roomId: roomId },
      });
      const messageData = response.data;
      setChat(messageData);
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const leaveRoom = async () => {
    try {
      const { data } = await axios.post(leaveRoomRoute, { roomId, userId });
      if (data.status === true) {
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.error('Error leave room: ', error);
    }
  };

  const handleSendMessage = async (message) => {
    socket.emit('send-message', { message, roomId, sender: currentUser });
    await axios.post(sendMessageRoute, {
      room: room,
      sender: currentUser,
      message: message,
    });
    if (currentUser) {
      setChat((prev) => [...prev, { sender: currentUser, message }]);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('message-from-server', ({ message, sender }) => {
      setChat((prev) => [...prev, { sender, message }]);
    });
  }, [socket]);

  useEffect(() => {
    fetchMessages(roomId);
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [chat]);

  return (
    <ChatContainer>
      <div className="title">
        <h2>{selectedRoom.name}</h2>
        <button className="exit" onClick={leaveRoom}>
          Exit
        </button>
      </div>
      <div className="chat-messages">
        {chat.map((messageObject, index) => (
          <p key={index} ref={index === chat.length - 1 ? scrollRef : null}>
            <strong>{messageObject.sender.username} : </strong>
            {messageObject.message}
          </p>
        ))}
      </div>
      <div className="input-container">
        <ChatForm className="chat-form" handleSendMessage={handleSendMessage} />
      </div>
      <ToastContainer />
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  background-color: #faf6f0;
  flex: 3;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #faf6f0;
  .exit {
    justify-content: flex-end;
    width: 7%;
    border: none;
    border-radius: 20px;
    padding: 5px;
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
  .title {
    display: flex;
    background-color: black;
    color: #f4dfc8;
    justify-content: center;
    align-items: center;
  }
  .chat-messages {
    padding: 7px;
    flex: 1;
    overflow-y: auto;
  }
`;
