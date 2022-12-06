import React, { useState } from "react";

import RequestHandler from "../../components/RequestHandler";
import { getCommandName, kustomerCommandRun } from "../../utils";
import { Button, Card, Loading, Text } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import Select from "react-select";

const SetSettings: React.FC<{ appName: string; settings: any }> = ({
  appName,
  settings,
}) => {
  const [activeChannel, setActiveChannel] = useState({
    value: settings.default.channelId,
  });

  const {
    data: settingsOptions,
    error: settingsOptionsError,
    isLoading: settingsOptionsLoading,
  } = useQuery({
    queryFn: kustomerCommandRun,
    queryKey: [getCommandName("getTeamChannels", appName)],
  });

  const saveSettings = useMutation(kustomerCommandRun);

  const channels = settingsOptions?.teamChannels?.channels?.map((channel) => ({
    value: channel.id,
    label: channel.name,
  }));

  console.log(settingsOptions);

  const activeChannelOption = channels?.find(
    (channel) => channel.value === activeChannel.value
  );

  return (
    <RequestHandler
      loading={settingsOptionsLoading}
      error={Boolean(settingsOptionsError || saveSettings.error)}
    >
      <Card css={{ overflow: "visible" }}>
        <Card.Header>
          <Text h4>{t("settings.selectChannel")}</Text>
        </Card.Header>
        <Card.Body css={{ pb: "$sm", pt: 0, f: 1, overflow: "visible" }}>
          <Select
            options={channels}
            value={activeChannelOption}
            onChange={setActiveChannel}
          />
        </Card.Body>
        <Card.Footer css={{ jc: "flex-end", zIndex: 0 }}>
          <Button
            disabled={saveSettings.isLoading}
            onClick={() => {
              saveSettings.mutate({
                queryKey: [
                  getCommandName("setSettings", appName),
                  { default: { channelId: activeChannel.value } },
                ],
              });
            }}
          >
            {saveSettings.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              t("common.save")
            )}
          </Button>
        </Card.Footer>
      </Card>
    </RequestHandler>
  );
};

export default SetSettings;
