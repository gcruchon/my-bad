import pkg from "../../../package.json";

export const getAppVersion = () => {
  return pkg.version;
}
