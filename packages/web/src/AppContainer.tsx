import { useEffect, useState } from "react";

import RequestHandler from "./components/RequestHandler";
import Settings from "./views/Settings";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const [initializationError, setInitializationError] =
    useState<boolean>(false);
  const [appName, setAppName] = useState<string>();

  useEffect(() => {
    window.Kustomer?.initialize?.((context: any) => {
      if (!context) return setInitializationError(true);
      setAppName(context.app.attributes.name);
      window.Kustomer.resize();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <RequestHandler loading={!appName} error={initializationError}>
          <Settings appName={appName} />
        </RequestHandler>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default AppContainer;
