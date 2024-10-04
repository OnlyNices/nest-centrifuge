import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CentClient } from "cent.js";

import { CENTRIFUGE_OPTIONS } from "./centrifuge.constants";
import { CentrifugeOptions } from "./centrifuge.type";

@Injectable()
export class CentrifugeService {
  private readonly _client: CentClient;

  constructor(
    @Inject(CENTRIFUGE_OPTIONS)
    private readonly options: CentrifugeOptions,
    private readonly jwtService: JwtService
  ) {
    this._client = new CentClient({
      url: this.options.centrifugeUrl,
      apiKey: this.options.apiKey,
    });
  }

  async generateUserToken(userId: string, channels?: string[]) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        channels: channels?.length > 0 ? channels : undefined,
      },
      this.options.jwt
    );

    return token;
  }

  get client() {
    return this._client;
  }
}
