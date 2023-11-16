import React from 'react';
import styled from 'styled-components';

export default function Undefined() {
  return (
    <UndefinedContainer>
      <p>선택된 방이 없습니다.</p>
    </UndefinedContainer>
  );
}

const UndefinedContainer = styled.div`
  display: flex;
  background-color: black;
  color: white;
  flex: 3;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #f4dfc8;
`;
