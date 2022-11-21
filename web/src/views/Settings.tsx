import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Image,
  Container,
  Card,
  Text,
  Spacer,
  Loading,
} from '@nextui-org/react';
import Select from 'react-select';
import { useEffect } from 'react';

const url = new URL(
  'https://8bb1-2804-14d-5883-8a78-d811-4b7e-d92c-492c.sa.ngrok.io/',
);

const linkSlackAccount = (orgId: string) => {
  window.Kustomer.showModal({
    type: 'redirect',
    content: {
      title: 'Install In Slack',
      iconUrl: `${url.protocol}//${url.host}/assets/icon.png`,
      description:
        'You will need to go to Slack and install the Kustomer app.\nClick "Install In Slack" below.',
      primaryDataKt: 'goToSlack',
      secondaryDataKt: 'cancelAddSlack',
      showCancelButton: true,
      actionButton: {
        text: 'Install In Slack',
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
    queryFn: () => Kustomer.request({ method: 'get', url: '/v1/orgs/current' }),
  });

  useEffect(() => {
    window.Kustomer?.initialize?.((context: any) => {
      if (context) {
        window.Kustomer.resize();
      }
    });
  }, []);

  useEffect(() => {
    window.Kustomer.resize();
  }, [isLoading]);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Container css={{ ai: 'center', jc: 'center' }}>
        <Text>Something went wrong, please try again later.</Text>
      </Container>
    );

  const channels = [1, 2, 3, 4, 5, 6];

  const options = channels.map(a => ({
    value: 'Test' + a,
    label: 'Test' + a,
  }));

  return (
    <Container css={{ pt: '$lg' }}>
      <Card>
        <Card.Header>
          <Text>First, you need to install the app in your Slack account</Text>
        </Card.Header>
        <Card.Footer css={{ pt: 0 }}>
          <Button
            css={{ fg: 1 }}
            onClick={() => linkSlackAccount(org.id)}
            icon={
              <Image
                src={`${url.protocol}//${url.host}/assets/icon.png`}
                width={20}
              />
            }
          >
            Install In Slack
          </Button>
        </Card.Footer>
      </Card>
      <Spacer />
      <Card css={{ overflow: 'visible' }}>
        <Card.Header>
          <Text h4>Select your preferred Slack channel:</Text>
        </Card.Header>
        <Card.Body css={{ pb: '$sm', pt: 0, f: 1, overflow: 'visible' }}>
          <Select options={options} />
        </Card.Body>
        <Card.Footer css={{ jc: 'flex-end', zIndex: 0 }}>
          <Button>Save</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Settings;
