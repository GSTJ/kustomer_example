import { Commands } from "@slack-app/types";

import kapp from "../services/kapp";

kapp.onCommand(Commands.GetSettings, (orgId: string) => {
  return kapp.org(orgId).settings.get();
});
