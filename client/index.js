import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import App from './components/App';
import './styles/styles.css';

// If we want to change our theme colors, we can do it here.

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

render(
  <Router>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </Router>,
  document.getElementById('root')
);
