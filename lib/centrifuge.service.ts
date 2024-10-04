import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CENTRIFUGE_JWT_OPTIONS } from "./centrifuge.constants";
import { CetnrifugeJwtOptions } from "./centrifuge.type";

@Injectable()
export class CentrifugeAuthService {
  constructor(
    @Inject(CENTRIFUGE_JWT_OPTIONS)
    private readonly jwtOptions: CetnrifugeJwtOptions,
    private readonly jwtService: JwtService
  ) {}

  async generateUserToken(userId: string, channels?: string[]) {
    const token = await this.jwtService.signAsync(
      { sub: userId, channels },
      this.jwtOptions
    );

    return token;
  }
}
