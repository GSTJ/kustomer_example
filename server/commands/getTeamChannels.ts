import { Commands } from '../../@types/Commands';
import kapp from '../services/kapp';
import sapp from '../services/sapp';
import slackAuthStore from '../services/slackAuthStore';

kapp.onCommand(Commands.GetTeamChannels, (orgId: string) => {
  const session = slackAuthStore.get(orgId);

  if (!session || !session.bot) return;

  return sapp.client.conversations.list({ token: session.bot.token });
});
