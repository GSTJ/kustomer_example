import { createTheme, NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import Settings from "./views/Settings";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#090909",
    },
  },
});

const queryClient = new QueryClient();

const AppContainer = () => {
  useEffect(() => {
    window.Kustomer?.initialize?.((context: any) => {
      if (context) {
        window.Kustomer.resize();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <Settings />
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default AppContainer;
