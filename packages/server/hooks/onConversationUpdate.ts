import kapp from "../services/kapp";

const MESSAGES_SENT: { [id: string]: boolean | undefined } = {};

kapp.on("message", "update", async (evt) => {
  kapp.log.info("inbound message.update event");
  // console.log(JSON.stringify(evt));
});

kapp.on("conversation", "create", async (evt) => {
  kapp.log.info("inbound message.create event");
  console.log(JSON.stringify(evt));
});

kapp.on("message", "create", async (evt) => {
  kapp.log.info("inbound message.create event");
  // console.log(JSON.stringify(evt));
});

kapp.on("conversation", "update", async (evt) => {
  kapp.log.info("inbound cvs update event");
  console.log(JSON.stringify(evt));
});
