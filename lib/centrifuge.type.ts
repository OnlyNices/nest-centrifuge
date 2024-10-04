import { FactoryProvider } from "@nestjs/common";
import { CentClient } from "cent.js";

export type CetnrifugeJwtOptions = {
  secret: string;
  issuer: string;
  audience: string;
};

export type CentrifugeOptions = {
  centrifugeUrl: string;
  apiKey: string;
  jwt: CetnrifugeJwtOptions;
};

export type CentrifugeClient = CentClient;

export type CentrifugeModuleAsyncOptions = Pick<
  FactoryProvider<CentrifugeOptions>,
  "useFactory" | "inject"
>;
