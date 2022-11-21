import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createTheme } from '@nextui-org/react';

import Settings from './views/Settings';

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#090909',
    },
  },
});

const queryClient = new QueryClient();

const AppContainer = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <Settings />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default AppContainer;
