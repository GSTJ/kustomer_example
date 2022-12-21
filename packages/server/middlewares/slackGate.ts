import { getSettings } from "../utils/getSettings";

export const slackGate = async ({ query }, res, next) => {
  const orgId = query?.orgId as string;

  if (!orgId) return res.status(401).json({ error: "Missing Org ID" });

  const settings = await getSettings(orgId);

  res.locals.orgId = orgId;
  res.locals.settings = settings;

  next();
};
