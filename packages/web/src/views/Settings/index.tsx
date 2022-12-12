import RequestHandler from "../../components/RequestHandler";
import { axiosRequest } from "../../utils";
import AddToSlack from "./AddToSlack";
import SetSettings from "./SetSettings";
import { useQuery } from "@tanstack/react-query";

const Settings: React.FC = () => {
  const {
    data: settings,
    error: settingsError,
    isLoading: settingsLoading,
  } = useQuery(["get", "/settings"], axiosRequest);

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
