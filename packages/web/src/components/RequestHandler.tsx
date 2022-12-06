import { ReactElement } from "react";

import { Button, Container, Loading, Text } from "@nextui-org/react";

interface IRefetch {
  refetch?: () => void;
}

interface RequestHandlerProps extends IRefetch {
  error?: boolean;
  loading?: boolean;
  children: ReactElement;
}

export const ErrorComponent = ({ refetch }: IRefetch) => {
  return (
    <Container css={{ jc: "center", ai: "center", d: "flex", fd: "column" }}>
      <Text css={{ mb: "$sm" }}>
        Something went wrong, please try again later.
      </Text>
      <Button onClick={refetch}>Try again</Button>
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
