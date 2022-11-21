import { Commands } from "@slack-app/shared/types";

import kapp from "../services/kapp";

kapp.onCommand(Commands.GetSettings, (orgId: string) => {
  return kapp.org(orgId).settings.get();
});
