import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { CENTRIFUGE_OPTIONS } from "./centrifuge.constants";
import { CentrifugeService } from "./centrifuge.service";
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
          provide: CENTRIFUGE_OPTIONS,
          useValue: opts,
        },
        CentrifugeService,
      ],
      exports: [CentrifugeService],
    };
  }

  static forRootAsync(opts: CentrifugeModuleAsyncOptions): DynamicModule {
    return {
      module: CentrifugeModule,
      imports: [JwtModule.register({})],
      providers: [
        {
          inject: opts.inject,
          provide: CENTRIFUGE_OPTIONS,
          useFactory: async (...args) => {
            const options = await opts.useFactory(...args);
            return options;
          },
        },
        CentrifugeService,
      ],
      exports: [CentrifugeService],
    };
  }
}
