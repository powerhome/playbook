declare module "trix";
declare module '*.scss';
declare module '*?url' {
  const src: string;
  export default src;
}