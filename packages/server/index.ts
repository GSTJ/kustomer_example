import "./commands";

import kapp from "./services/kapp";

export { kapp };

kapp.useSettings(
  "Slack Settings",
  "Here you will be able to configure what notifications to recieve and when",
  "../web/build"
);

(async () => {
  try {
    await kapp.start({ port: Number(process.env.PORT || 3000) });
  } catch (err) {
    kapp.log.error(JSON.stringify(err, undefined, 2));
  }
})();
