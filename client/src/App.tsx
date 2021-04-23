import { Fragment } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './styles';

const Container = styled.main`
  display: flex;
  height: 100vh;
`;

const Heading = styled.h1`
  margin: auto;
`;

export const App = () => (
  <Fragment>
    <GlobalStyles />
    <Container>
      <Heading>Hello World!</Heading>
    </Container>
  </Fragment>
);
