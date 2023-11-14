import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getMessagesRoute, sendMessageRoute } from '../../utils/APIRoutes';

export default function Chat({ socket, selectedRoom, currentUser }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const room = selectedRoom;
  const roomId = room._id;
  const scrollRef = useRef();

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

  async function handleForm(e) {
    e.preventDefault();
    if (!message) return;
    socket.emit('send-message', { message, roomId, sender: currentUser });
    await axios.post(sendMessageRoute, {
      room: room,
      sender: currentUser,
      message: message,
    });
    if (currentUser) {
      setChat((prev) => [...prev, { sender: currentUser, message }]);
    }
    setMessage('');
  }

  useEffect(() => {
    if (!socket) return;
    socket.on('message-from-server', ({ message, sender }) => {
      setChat((prev) => [...prev, { sender, message }]);
      // console.log(sender);
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
      <h2>{selectedRoom.name}</h2>
      {chat.map((messageObject, index) => (
        <p key={index} ref={index === chat.length - 1 ? scrollRef : null}>
          {messageObject.sender.username} : {messageObject.message}
        </p>
      ))}
      <form onSubmit={handleForm}>
        <input
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  background-color: pink;
  flex: 3;
  overflow-y: auto;
`;
