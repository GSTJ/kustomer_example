import { Commands } from '../../@types/Commands';
import kapp from '../services/kapp';

kapp.onCommand(Commands.GetSettings, (orgId: string) => {
  return kapp.org(orgId).settings.get();
});
