import './commands';

import kapp from './services/kapp';

export { kapp };

export const start = async () => {
  try {
    await kapp.start({ port: Number(process.env.PORT || 3000) });
    kapp.log.info('Server started successfully');
  } catch (err) {
    kapp.log.error(JSON.stringify(err, undefined, 2));
  }
};
