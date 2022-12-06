import kapp from "../services/kapp";
import sapp from "../services/sapp";

kapp.app.get("/getSettingsOptions", async ({ params }, res) => {
  const orgId = (params as any)?.orgId;

  const settings = await kapp.org(orgId).settings.get();
  const slackAuthData = JSON.parse(settings.default.slackAuthData);

  if (!slackAuthData || !slackAuthData.bot) return;

  const [teamChannels, users, teams] = await Promise.all([
    sapp.client.conversations.list({
      token: slackAuthData.bot.token,
    }),
    kapp
      .org(orgId)
      .axios.get("https://api.kustomerapp.com/v1/users")
      .catch(console.log),
    kapp
      .org(orgId)
      .axios.get("https://api.kustomerapp.com/v1/teams")
      .catch(console.log),
  ]);

  console.log("users", users);
  console.log("teams", teams);

  return res.json({ teamChannels, users, teams });
});
