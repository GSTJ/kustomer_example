export const getCookie = (name: string, cookies?: string) => {
  if (!cookies) return;

  const found = cookies.split(";").find((c) => c.trim().startsWith(`${name}=`));
  if (!found) return;

  return found.split("=")[1].trim();
};
