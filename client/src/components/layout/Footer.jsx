import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return <FooterContainer>FOOTER</FooterContainer>;
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  background-color: black;
  color: #F4DFC8;
  padding: 1rem;
`;
