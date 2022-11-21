import {
  Button,
  Card,
  Container,
  Image,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import RequestHandler from "../components/RequestHandler";

const url = new URL(process.env.REACT_APP_BASE_URL);

const linkSlackAccount = (orgId: string) => {
  window.Kustomer.showModal({
    type: "redirect",
    content: {
      title: "Install In Slack",
      iconUrl: `${url.protocol}//${url.host}/assets/icon.png`,
      description:
        'You will need to go to Slack and install the Kustomer app.\nClick "Install In Slack" below.',
      primaryDataKt: "goToSlack",
      secondaryDataKt: "cancelAddSlack",
      showCancelButton: true,
      actionButton: {
        text: "Install In Slack",
        linkUrl: `${url.protocol}//${url.host}/slack/install?orgId=${orgId}`,
      },
    },
  });
};

const Settings = () => {
  const {
    data: org,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => Kustomer.request({ method: "get", url: "/v1/orgs/current" }),
  });

  const channels = [1, 2, 3, 4, 5, 6];

  const options = channels.map((a) => ({
    value: "Test" + a,
    label: "Test" + a,
  }));

  return (
    <RequestHandler loading={isLoading} error={Boolean(error)}>
      <Container css={{ pt: "$lg" }}>
        <Card>
          <Card.Header>
            <Text>
              First, you need to install the app in your Slack account
            </Text>
          </Card.Header>
          <Card.Footer css={{ pt: 0 }}>
            <Button
              css={{ fg: 1 }}
              onClick={() => linkSlackAccount(org.id)}
              icon={<Image src="/assets/icon.png" width={20} />}
            >
              Install In Slack
            </Button>
          </Card.Footer>
        </Card>
        <Spacer />
        <Card css={{ overflow: "visible" }}>
          <Card.Header>
            <Text h4>Select your preferred Slack channel:</Text>
          </Card.Header>
          <Card.Body css={{ pb: "$sm", pt: 0, f: 1, overflow: "visible" }}>
            <Select options={options} />
          </Card.Body>
          <Card.Footer css={{ jc: "flex-end", zIndex: 0 }}>
            <Button>Save</Button>
          </Card.Footer>
        </Card>
      </Container>
    </RequestHandler>
  );
};

export default Settings;
