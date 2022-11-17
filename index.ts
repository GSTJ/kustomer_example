import "dotenv/config";
import { KApp, ROLES } from "@kustomer/apps-server-sdk";
import fs from "fs";
import path from "path";
import express from "express";

import pkg from "./package.json";
import changelog from "./changelog.json";

if (!process.env.BASE_URL) {
  throw new Error("baseUrl is required");
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error("clientId and clientSecret are required");
}

const kapp = new KApp({
  app: pkg.name,
  version: pkg.version,
  title: "Test App",
  visibility: "private",
  description: fs
    .readFileSync(path.join(__dirname, "description.md"))
    .toString(),
  dependencies: [],
  default: false,
  system: false,
  url: process.env.BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  iconUrl: `${process.env.BASE_URL}/assets/icon.png`,
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

kapp.useView("my-example-view", "views", {
  displayName: "My example view",
  context: "smartbar-card",
  resource: "conversation",
  icon: "apps",
  state: "open",
  iframe: true,
});

kapp.app.use("/views", express.static(path.join(process.cwd(), "/src/views")));

(async () => {
  try {
    await kapp.start({ port: Number(process.env.PORT || 3000) });
  } catch (err) {
    console.log(err);
    kapp.log.error(JSON.stringify(err, undefined, 2));
  }
})();
