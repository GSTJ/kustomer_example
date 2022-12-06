import React from "react";

import { Text } from "@nextui-org/react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const baseURL = process.env.REACT_APP_BASE_URL;

const linkSlackAccount = (orgId: string) => {
  window.Kustomer.showModal({
    type: "redirect",
    content: {
      title: i18n.t("settings.installSlackModal.title"),
      iconUrl: `${baseURL}/assets/icon.png`,
      description: i18n.t("settings.installSlackModal.description"),
      primaryDataKt: "goToSlack",
      secondaryDataKt: "cancelAddSlack",
      showCancelButton: true,
      actionButton: {
        text: i18n.t("settings.installInSlack"),
        linkUrl: `${baseURL}/slack/install?orgId=${orgId}`,
      },
    },
  });
};

const AddToSlack: React.FC<{ orgId: string }> = ({ orgId }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      <Text h6 css={{ m: 0 }}>
        {t("settings.installInSlackFirst")}
      </Text>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => linkSlackAccount(orgId)}
      >
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </div>
    </div>
  );
};

export default AddToSlack;
