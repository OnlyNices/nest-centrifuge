import { Inject, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { CENTRIFUGE_OPTIONS } from "./centrifuge.constants";
import {
  CentrifugeAuthHeader,
  CentrifugeOptions,
  CentrifugePublishPayload,
} from "./centrifuge.type";

@Injectable()
export class CentrifugeService {
  private readonly logger = new Logger(CentrifugeService.name);

  constructor(
    @Inject(CENTRIFUGE_OPTIONS)
    private readonly options: CentrifugeOptions,
    private readonly jwtService: JwtService
  ) {}

  async generateUserToken(sub: string, channels: string[]) {
    const token = await this.jwtService.signAsync(
      { sub, channels },
      this.options.jwt
    );

    return token;
  }

  async publish(channel: string, data: any) {
    const payload: CentrifugePublishPayload = {
      method: "publish",
      params: {
        channel,
        data,
      },
    };

    const headers: CentrifugeAuthHeader = {
      Authorization: `apikey ${this.options.apiKey}`,
    };

    try {
      const response = await axios.post(this.options.centrifugeUrl, payload, {
        headers,
      });
      return response.data;
    } catch (err) {
      this.logger.error(`Publish to channel "${channel}" failed`);
      return err;
    }
  }
}
