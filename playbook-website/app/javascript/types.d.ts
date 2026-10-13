declare module "playbook-ui";
declare module "*.svg";
declare module "*?worker&url" {
  const url: string;
  export default url;
}