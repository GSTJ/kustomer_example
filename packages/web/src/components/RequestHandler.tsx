import { ReactElement } from "react";

import { Button, Container, Loading, Text } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface IRefetch {
  refetch?: () => void;
}

interface RequestHandlerProps extends IRefetch {
  error?: boolean;
  loading?: boolean;
  children: ReactElement;
}

export const ErrorComponent = ({ refetch }: IRefetch) => {
  const { t } = useTranslation();

  return (
    <Container css={{ jc: "center", ai: "center", d: "flex", fd: "column" }}>
      <Text css={{ mb: "$sm" }}>{t("requestHandler.somethingWentWrong")}</Text>
      <Button onClick={refetch}>{t("requestHandler.tryAgain")}</Button>
    </Container>
  );
};

export const LoadingComponent = () => {
  return (
    <Container css={{ jc: "center", ai: "center", d: "flex" }}>
      <Loading />
    </Container>
  );
};

export default ({ children, loading, error, refetch }: RequestHandlerProps) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  return children;
};
