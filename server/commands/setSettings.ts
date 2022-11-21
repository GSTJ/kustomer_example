import { Commands } from '../../@types/Commands';
import kapp from '../services/kapp';
import sapp from '../services/sapp';
import slackAuthStore from '../services/slackAuthStore';

kapp.onCommand(
  Commands.SetSettings,
  async (
    orgId: string,
    _userId: string,
    data: {
      default: { teamId?: string; channelId?: string };
    },
  ) => {
    const session = slackAuthStore.get(orgId);

    if (!session || !session.bot) {
      return kapp.log.warn(
        'Auth session not found, sign-in to your Slack workplace',
      );
    }

    if (data.default.channelId) {
      try {
        await sapp.client.conversations.join({
          token: session.bot.token,
          channel: data.default.channelId,
        });
      } catch (err) {
        kapp.log.error(err);
      }
    }

    return kapp.org(orgId).settings.set(data);
  },
);
