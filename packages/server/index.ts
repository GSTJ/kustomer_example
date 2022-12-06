import "./commands";
import "./hooks/onConversationUpdate";

import kapp from "./services/kapp";
import { slackExpressReceiver } from "./services/sapp";

export { kapp };

kapp.useSettings(
  "Slack Settings",
  "Here you will be able to configure what notifications to recieve and when",
  "../web/build"
);

kapp.app.use(slackExpressReceiver.app);

(async () => {
  try {
    await kapp.start({ port: Number(process.env.PORT || 3000) });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(err));
  }
})();
