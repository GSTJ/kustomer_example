import kapp from "../services/kapp";
import sapp from "../services/sapp";
import { getSettings } from "../utils/getSettings";

const MESSAGES_SENT: { [id: string]: boolean | undefined } = {};

// kapp.on("message", "update", async (evt) => {
//   kapp.log.info("inbound message.update event");
//   // console.log(JSON.stringify(evt));
// });

// kapp.on("conversation", "create", async (evt) => {
//   kapp.log.info("inbound message.create event");
//   console.log(JSON.stringify(evt));
// });

// kapp.on("message", "create", async (evt) => {
//   kapp.log.info("inbound message.create event");
//   // console.log(JSON.stringify(evt));
// });

kapp.on("conversation", "update", async (evt) => {
  kapp.log.info("inbound cvs update event");

  const { orgId } = evt;

  const settings = await getSettings(orgId);

  const { slackAuthData, channelId } = settings.default;

  if (!slackAuthData?.bot?.token) {
    return kapp.log.warn(
      "Auth session not found, sign-in to your Slack workplace"
    );
  }

  if (!channelId) {
    return kapp.log.warn("The channel has not been selected in app settings");
  }

  // const message = await kapp
  //   .org(orgId)
  //   .messages.getById(evt.data.attributes.lastMessageIn.id);

  const message = evt.data.attributes;

  const customer = evt.data.relationships?.customer?.data;

  await sapp.client.chat.postMessage(
    {
      token: slackAuthData.bot.token,
      channel: settings.default.channelId,
      text: message.preview,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🧯 A new message requires attention",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Channel:*\n${
                ((message as any)?.channels || []).join(", ") || "N/A"
              }`,
            },
            {
              type: "mrkdwn",
              text: "*From:*\n<example.com|John Doe>",
            },
          ],
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Message:*\n${message.preview}`,
            },
            {
              type: "mrkdwn",
              text: `*Priority level:*\n${message.priority}`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              url: `https://zzz-external-app-devs.kustomerapp.com/app/customers/${customer?.id}`,
              text: {
                type: "plain_text",
                text: "Open message in Kustomer",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "actionId-0",
            },
          ],
        },
      ],
    }
    // [
    //   {
    //     type: "section",
    //     text: {
    //       type: "mrkdwn",
    //       text: `*Status:* ${message.status}`,
    //     },
    //     accessory: {
    //       type: "button",
    //
    //       text: {
    //         type: "plain_text",
    //         text: "View",
    //         emoji: true,
    //       },
    //     },
    //   },
    //   {
    //     type: "section",
    //     text: {
    //       type: "mrkdwn",
    //       text: `*Message:* ${message.preview}`,
    //     },
    //   },
    // ],
  );

  console.log(JSON.stringify(evt));
});
