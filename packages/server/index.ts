import "express-async-errors";
import "./hooks/onConversationUpdate";

import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import kapp from "./services/kapp";
import { slackExpressReceiver } from "./services/sapp";

export { kapp };

kapp.useSettings(
  "Slack Settings",
  "Here you will be able to configure what notifications to recieve and when",
  "../web/build"
);

kapp.app.use(slackExpressReceiver.app);
kapp.app.use(router);
kapp.app.use(errorHandler);

(async () => {
  try {
    await kapp.start({ port: Number(process.env.PORT || 3000) });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(err));
  }
})();
