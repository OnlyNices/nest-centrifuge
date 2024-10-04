import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CentClient } from "cent.js";

import { CentrifugeAuthService } from "./centrifuge.service";
import {
  CENTRIFUGE_CLIENT,
  CENTRIFUGE_JWT_OPTIONS,
} from "./centrifuge.constants";
import {
  CentrifugeModuleAsyncOptions,
  CentrifugeOptions,
} from "./centrifuge.type";

@Global()
@Module({})
export class CentrifugeModule {
  static forRoot(opts: CentrifugeOptions): DynamicModule {
    return {
      module: CentrifugeModule,
      imports: [JwtModule.register({})],
      providers: [
        {
          provide: CENTRIFUGE_JWT_OPTIONS,
          useValue: opts.jwt,
        },
        {
          provide: CENTRIFUGE_CLIENT,
          useValue: new CentClient({
            url: opts.centrifugeUrl,
            apiKey: opts.apiKey,
          }),
        },
        CentrifugeAuthService,
      ],
      exports: [CENTRIFUGE_CLIENT, CentrifugeAuthService],
    };
  }

  static forRootAsync(opts: CentrifugeModuleAsyncOptions): DynamicModule {
    return {
      module: CentrifugeModule,
      imports: [JwtModule.register({})],
      providers: [
        {
          inject: opts.inject,
          provide: CENTRIFUGE_JWT_OPTIONS,
          useFactory: async (...args) => {
            const options = await opts.useFactory(...args);
            return options.jwt;
          },
        },
        {
          inject: opts.inject,
          provide: CENTRIFUGE_CLIENT,
          useFactory: async (...args) => {
            const options = await opts.useFactory(...args);
            return new CentClient({
              url: options.centrifugeUrl,
              apiKey: options.apiKey,
            });
          },
        },
        CentrifugeAuthService,
      ],
      exports: [CENTRIFUGE_CLIENT, CentrifugeAuthService],
    };
  }
}
