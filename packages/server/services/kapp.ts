import { KApp, ROLES } from "@kustomer/apps-server-sdk";
import fs from "fs";
import path from "path";

import changelog from "../../../changelog.json";
import pkg from "../../../package.json";

if (!process.env.APP_NAME) {
  throw new Error("appName is required");
}

if (!process.env.REACT_APP_BASE_URL) {
  throw new Error("baseUrl is required");
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error("clientId and clientSecret are required");
}

const kapp = new KApp({
  app: process.env.APP_NAME,
  version: pkg.version,
  title: "Slack v2",
  visibility: "private",
  description: fs
    .readFileSync(path.join(__dirname, "../../../description.md"))
    .toString(),
  dependencies: [],
  default: false,
  system: false,
  url: process.env.REACT_APP_BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  iconUrl: `${process.env.REACT_APP_BASE_URL}/assets/icon.png`,
  env: "prod",
  changelog,
  roles: ROLES.common,
  appDetails: {
    appDeveloper: {
      name: "Kustomer",
      website: "https://kustomer.com",
      supportEmail: "support@kustomer.com",
    },
    externalPlatform: {
      name: "Kustomer",
      website: "https://kustomer.com",
    },
  },
  screenshots: [],
  settings: {
    default: {},
  },
});

export default kapp;
