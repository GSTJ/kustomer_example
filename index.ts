import 'dotenv/config';

import * as Server from './server';

Server.kapp.useSettings(
  'Slack Settings',
  'Here you will be able to configure what notifications to recieve and when',
  '/web/build',
);

Server.start();
