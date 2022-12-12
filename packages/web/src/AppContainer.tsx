import { useEffect, useState } from "react";

import RequestHandler from "./components/RequestHandler";
import api from "./services/api";
import Store from "./services/store";
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
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [orgId, setOrgId] = useState<string>("");

  useEffect(() => {
    window.Kustomer?.initialize?.((context: any) => {
      try {
        if (!context) return setError(true);

        const appName = context.app.attributes.name;
        const orgId = appName.split("_").at(-1);

        // Set the orgId in the api default params
        // so the server can use it to get the context
        api.defaults.params = { ...api.defaults.params, orgId: orgId };

        setOrgId(orgId);

        window.Kustomer.resize();
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <RequestHandler loading={loading} error={error}>
          <Store.Provider value={{ orgId }}>
            <Settings />
          </Store.Provider>
        </RequestHandler>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default AppContainer;
