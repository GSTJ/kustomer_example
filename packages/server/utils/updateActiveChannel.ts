import sapp from "../services/sapp";

export const updateActiveChannel = async ({
  token,
  oldChannel,
  newChannel,
}: {
  token: string;
  oldChannel: string;
  newChannel: string;
}) => {
  if (oldChannel === newChannel) return;

  if (oldChannel) {
    await sapp.client.conversations.leave({
      token,
      channel: oldChannel,
    });
  }

  if (newChannel) {
    await sapp.client.conversations.join({
      token,
      channel: newChannel,
    });
  }
};
