import kapp from "../../services/kapp";
import { updateActiveChannel } from "../../utils/updateActiveChannel";
import express from "express";

export const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(res.locals.settings);
});

router.post("/", async ({ body }, res) => {
  const settings = res.locals.settings.default;

  const slackAuthData = settings.slackAuthData;

  if (!slackAuthData || !slackAuthData.bot) {
    return res
      .status(503)
      .json("Auth session not found, sign-in to your Slack workplace");
  }

  await updateActiveChannel({
    token: slackAuthData.bot.token,
    oldChannel: settings.channelId,
    newChannel: body.default.channelId,
  });

  await kapp.org(res.locals.orgId).settings.set(body);

  return res.json(body);
});

export default router;
