/// <reference types="react-scripts" />

declare module "*.png";
declare module "*.css";
declare module "*.svg";
declare module "canisters/CanCan" {
  export const idlFactory: any;
  export const canisterId: string;
}
