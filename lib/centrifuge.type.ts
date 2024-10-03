import { FactoryProvider } from '@nestjs/common';

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
  'useFactory' | 'inject'
>;

export type CentrifugeAuthHeader = {
  Authorization: string;
};

export type CentrifugePublishPayload = {
  method: 'publish';
  params: {
    channel: string;
    data: any;
  };
};
