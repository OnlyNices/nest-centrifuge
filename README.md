# NestJS Centrifuge integration module using cent.js

# nest-centrifuge

## Install

```sh
npm install @onlynices/nest-centrifuge
```

## How To use

```ts
import { CentrifugeService } from '@onlynices/nest-centrifuge';
import { CentClient } from 'cent.js'

@Injectable()
export class AppService { 
  private readonly client: CentClient;

  constructor(private readonly centrifuge: CentrifugeService) {
    this.client = centrifuge.client;
  }

  getChannels() {
    return this.client.channels({ pattern: "*" });

    // or 

    return this.centrifuge.client.channels({ pattern: "*" });
  }
}
```

**Hint** : methods args without any request parameters need to pass `{}`

### all types are sync with latests Centrifugo api docs (currently v5) you can find in

<https://centrifugal.dev/docs/server/server_api#http-api>