import kapp from "../services/kapp";
import sapp from "../services/sapp";
import { Commands } from "@slack-app/shared";

const updateActiveChannel = async ({
  token,
  oldChannel,
  newChannel,
}: {
  token: string;
  oldChannel: string;
  newChannel: string;
}) => {
  if (oldChannel === newChannel) return;

  if (oldChannel) {
    await sapp.client.conversations.leave({
      token,
      channel: oldChannel,
    });
  }

  if (newChannel) {
    await sapp.client.conversations.join({
      token,
      channel: newChannel,
    });
  }
};

kapp.onCommand(
  Commands.SetSettings,
  async (
    orgId: string,
    _userId: string,
    data: { default: { channelId?: string } }
  ) => {
    const settings = await kapp.org(orgId).settings.get();
    const slackAuthData = JSON.parse(settings.default.slackAuthData);

    if (!slackAuthData || !slackAuthData.bot) {
      kapp.log.warn("Auth session not found, sign-in to your Slack workplace");
      return;
    }

    await updateActiveChannel({
      token: slackAuthData.bot.token,
      oldChannel: settings.default.channelId,
      newChannel: data.default.channelId,
    });

    return kapp.org(orgId).settings.set(data);
  }
);
