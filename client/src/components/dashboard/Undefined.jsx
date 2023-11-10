import React from 'react';
import styled from 'styled-components';

export default function Undefined() {
  return <UndefinedContainer>선택된 방이 없습니다.</UndefinedContainer>;
}

const UndefinedContainer = styled.div`
  background-color: pink;
  flex: 3;
  overflow-y: auto;
`;
