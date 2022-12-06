import kapp from "../services/kapp";
import sapp from "../services/sapp";
import { Commands } from "@slack-app/shared";

kapp.onCommand(Commands.GetTeamChannels, async (orgId: string) => {
  const settings = await kapp.org(orgId).settings.get();
  const slackAuthData = JSON.parse(settings.default.slackAuthData);

  if (!slackAuthData || !slackAuthData.bot) return;

  return sapp.client.conversations.list({
    token: slackAuthData.bot.token,
  });
});
