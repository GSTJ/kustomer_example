import RequestHandler from "../../components/RequestHandler";
import api from "../../services/api";
import AddToSlack from "./AddToSlack";
import SetSettings from "./SetSettings";
import { useQuery } from "@tanstack/react-query";

const Settings: React.FC = () => {
  const {
    data: settings,
    error: settingsError,
    isLoading: settingsLoading,
  } = useQuery({
    queryHash: "settings",
    queryFn: async () => {
      const result = await api.get("/settings");
      return result.data;
    },
  });

  const isSlackConnected = Boolean(settings?.default?.slackAuthData?.bot);

  return (
    <RequestHandler
      loading={!settings && settingsLoading}
      error={Boolean(settingsError)}
    >
      <>
        {!isSlackConnected && <AddToSlack />}
        {isSlackConnected && <SetSettings settings={settings} />}
      </>
    </RequestHandler>
  );
};

export default Settings;
