import { FactoryProvider } from "@nestjs/common";

export type CentrifugeOptions = {
  centrifugeUrl: string;
  apiKey: string;
  jwt: {
    secret: string;
    issuer: string;
    audience: string;
  };
};

export type CentrifugeModuleAsyncOptions = Pick<
  FactoryProvider<CentrifugeOptions>,
  "useFactory" | "inject"
>;
