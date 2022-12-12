import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const namespace = (name: string) =>
  `${process.env.REACT_APP_NAME}--${name}`;

export const getAppName = (orgId: string) =>
  `${process.env.REACT_APP_NAME}_${orgId}`;

export const getCommandName = (command: string, appName: string) =>
  `${appName}.app.${namespace(command)}`;

export const axiosRequest: MutationFunction<any, any> = ({ queryKey }) =>
  axios({
    method: "post",
    url: queryKey[1],
    params: queryKey?.[2],
    body: queryKey?.[3],
  } as any);

export const kustomerRequest: QueryFunction<any, any> = ({ queryKey }) =>
  Kustomer.request({ method: queryKey[0], url: queryKey[1] });

export const kustomerCommandRun: MutationFunction<any, any> = ({ queryKey }) =>
  new Promise((resolve, reject) =>
    Kustomer.command.run(
      queryKey[0],
      { body: queryKey[1] || {} },
      (err: Error | null, res: any) => {
        if (err) reject(err);
        else resolve(res?.responseBody);
      }
    )
  );
