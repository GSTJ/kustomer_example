import kapp from "../../../services/kapp";
import sapp from "../../../services/sapp";
import { router } from "..";

router.get("/options", async (_req, res) => {
  const settings = res.locals.settings.default;

  const slackAuthData = settings.slackAuthData;

  if (!slackAuthData || !slackAuthData.bot) return;

  const axiosInstance = kapp.org(res.locals.orgId).axios;

  const [teamChannels, users, teams] = await Promise.all([
    sapp.client.conversations.list({
      token: slackAuthData.bot.token,
    }),
    axiosInstance
      .get("https://api.kustomerapp.com/v1/users")
      .then((res) => res.data),
    axiosInstance
      .get("https://api.kustomerapp.com/v1/teams")
      .then((res) => res.data),
  ]);

  return res.json({ teamChannels, users, teams });
});
