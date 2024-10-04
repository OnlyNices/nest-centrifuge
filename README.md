# NestJS Centrifuge integration module using cent.js

# nest-centrifuge

## Install

```sh
npm install @onlynices/nest-centrifuge
```

## How To use

```ts
import { CentrifugeAuthService, CentrifugeClient, CENTRIFUGE_CLIENT } from '@onlynices/nest-centrifuge';
import { Inject } from '@nestjs/common';

@Injectable()
export class AppService { 
  constructor(
    @Inject(CENTRIFUGE_CLIENT)
    private readonly centrifugeClient: CentrifugeClient,
    private readonly centrifugeAuthService: CentrifugeAuthService
    ) {}

  async createAuthToken(userId: number) {
    const token = await this.centrifugeAuthService.generateUserToken(userId.toString(), ['chat']);
    return token;
  }

  async getChannels() {
    const channels = await this.centrifugeClient.channels({ pattern: "*" });
    return channels;
  }

  // ...
}
```

**Hint** : methods args without any request parameters need to pass `{}`

### all types are sync with latests Centrifugo api docs (currently v5) you can find in

<https://centrifugal.dev/docs/server/server_api#http-api>