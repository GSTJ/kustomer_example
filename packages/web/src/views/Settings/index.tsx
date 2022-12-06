import RequestHandler from "../../components/RequestHandler";
import { getCommandName, kustomerCommandRun } from "../../utils";
import AddToSlack from "./AddToSlack";
import SetSettings from "./SetSettings";
import { useQuery } from "@tanstack/react-query";

const Settings: React.FC<{ appName: string }> = ({ appName }) => {
  const {
    data: settings,
    error: settingsError,
    isLoading: settingsLoading,
  } = useQuery([getCommandName("getSettings", appName)], kustomerCommandRun);

  const isSlackConnected = Boolean(settings?.default?.slackAuthData?.bot);

  const orgId = appName.split("_").at(-1);

  return (
    <RequestHandler
      loading={!settings && settingsLoading}
      error={Boolean(settingsError)}
    >
      <>
        {!isSlackConnected && <AddToSlack orgId={orgId} />}
        {isSlackConnected && (
          <SetSettings settings={settings} appName={appName} />
        )}
      </>
    </RequestHandler>
  );
};

export default Settings;
