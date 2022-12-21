import React, { useState } from "react";

import RequestHandler from "../../components/RequestHandler";
import api from "../../services/api";
import { Button, Card, Loading, Spacer, Text } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import Select from "react-select";

const priorityLevels = [0, 1, 2, 3, 4, 5].map((level) => ({
  value: level,
  label: level,
}));

const SetSettings: React.FC<{ settings: any }> = ({ settings }) => {
  const [activeChannel, setActiveChannel] = useState<string>(
    settings.default.channelId
  );
  const [priorityLevel, setPriorityLevel] = useState<number>(
    settings.default.priorityLevel
  );

  const {
    data: settingsOptions,
    error: settingsOptionsError,
    isLoading: settingsOptionsLoading,
  } = useQuery({
    queryHash: "/settings/options",
    queryFn: async () => {
      const result = await api.get("/settings/options");
      return result.data;
    },
  });

  const saveSettings = useMutation({
    mutationFn: async () => {
      const result = await api.post("/settings", {
        default: {
          channelId: activeChannel,
          priorityLevel,
        },
      });

      return result.data;
    },
  });

  const channels = (settingsOptions?.teamChannels?.channels || [])?.map(
    (channel) => ({
      value: channel.id,
      label: channel.name,
    })
  );

  const activeChannelOption = channels?.find(
    (channel) => channel.value === activeChannel
  );

  return (
    <RequestHandler
      loading={settingsOptionsLoading}
      error={Boolean(settingsOptionsError || saveSettings.error)}
    >
      <Card css={{ overflow: "visible" }}>
        <Card.Body css={{ pb: "$sm", pt: 0, f: 1, overflow: "visible" }}>
          <Spacer />
          <Text b css={{ mb: "$2" }}>
            {t("settings.selectChannel")}
          </Text>
          <Select
            options={channels}
            value={activeChannelOption}
            onChange={({ value }) => setActiveChannel(value)}
          />
          <Spacer />
          <Text b css={{ mb: "$2" }}>
            {t("settings.filterByPriority")}
          </Text>
          <Select
            value={{ value: priorityLevel, label: priorityLevel }}
            options={priorityLevels}
            onChange={({ value }) => setPriorityLevel(value)}
          />
        </Card.Body>
        <Card.Footer css={{ jc: "flex-end", zIndex: 0 }}>
          <Button
            disabled={saveSettings.isLoading}
            onClick={() => saveSettings.mutate()}
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
