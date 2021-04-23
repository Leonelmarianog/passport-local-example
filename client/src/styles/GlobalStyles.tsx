import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  :root {
    --font-size-base: 1rem;
  }

  ${normalize};

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: var(--font-size-base);
  }
`;
