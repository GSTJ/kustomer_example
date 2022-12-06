import kapp from "../services/kapp";
import { Commands } from "@slack-app/shared/types";

kapp.onCommand(Commands.GetSettings, async (orgId: string) => {
  const settings = await kapp.org(orgId).settings.get();

  settings.default.slackAuthData = JSON.parse(settings.default.slackAuthData);

  return settings;
});
