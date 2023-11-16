import React, { useState } from 'react';
import styled from 'styled-components';

export default function ChatForm({ handleSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    await handleSendMessage(message);
    setMessage('');
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  background-color: black;
  border-top: 1px solid #f4dfc8;
  padding: 3px;
  input {
    width: 80%;
    margin-left: 25px;
    border: none;
    border-radius: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: 10px;
    outline: none;
    &:focus {
      background-color: black;
      color: #f4eae0;
      border: 0.1rem solid #f4dfc8;
    }
    ::placeholder {
      color: #f4dfc8;
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
`;
