import kapp from "../services/kapp";
import { Installation } from "@slack/bolt";

interface GetSettingsReturn {
  default: {
    slackAuthData: Installation<never, boolean>;
    channelId: string;
    priorityLevel: number;
  };
}

export const getSettings = async (
  orgId: string
): Promise<GetSettingsReturn> => {
  const settings = await kapp.org(orgId).settings.get();

  settings.default.slackAuthData = JSON.parse(settings.default.slackAuthData);

  return settings;
};
