import { App as SApp, ExpressReceiver, InstallURLOptions } from "@slack/bolt";
import { IncomingMessage, ServerResponse } from "http";
import url from "url";

import { getCookie } from "../utils/getCookie";
import slackAuthStore from "./slackAuthStore";

const receiver = new ExpressReceiver({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  installationStore: slackAuthStore,
  stateSecret: process.env.CLIENT_SECRET,
  installerOptions: {
    stateVerification: true,
    directInstall: true,
    installPathOptions: {
      beforeRedirection: async (req: IncomingMessage, res: ServerResponse) => {
        if (!req.url) return false;

        const query = url.parse(req.url, true).query;

        if (!query.orgId) return false;

        res.setHeader("Set-Cookie", [
          `orgId=${query.orgId}; Secure; HttpOnly; Path=/; Max-Age=600`,
        ]);

        return true;
      },
    },
    callbackOptions: {
      beforeInstallation: async (
        options: InstallURLOptions,
        req: IncomingMessage
      ) => {
        options.metadata = getCookie("orgId", req.headers.cookie);

        return true;
      },
    },
  },
  scopes: [
    "groups:read",
    "channels:read",
    "channels:join",
    "chat:write",
    "im:read",
    "mpim:read",
  ],
});

const sapp = new SApp({ receiver });

export default sapp;
