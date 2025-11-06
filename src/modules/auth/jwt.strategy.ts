import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import User from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWTKEY'),
    });
  }

  async validate(payload: any) {
    try {
      this.logger.debug(`🔹 [JwtStrategy] JWT payload received: ${JSON.stringify(payload)}`);

      if (!payload?.user_id) {
        this.logger.error('❌ [JwtStrategy] Invalid JWT payload: user_id missing');
        throw new UnauthorizedException('Invalid JWT payload: user_id missing');
      }

      // 1️⃣ Fetch user
      const user: User = await this.userService.findOneById(payload.user_id);
      if (!user) {
        this.logger.error(`❌ [JwtStrategy] User not found for id=${payload.user_id}`);
        throw new UnauthorizedException('User not found');
      }
      this.logger.debug(`✅ [JwtStrategy] User fetched: id=${user.id}, team_id=${user.team_id}`);

      // 3️⃣ Final user object (goes into req.user)
      const jwtUser = {
        user_id: user.id,
        email: user.email_id
      };

      this.logger.debug(`✅ [JwtStrategy] Returning validated user: ${JSON.stringify(jwtUser)}`);
      return jwtUser;
    } catch (err) {
      this.logger.error(`❌ [JwtStrategy] Validation failed: ${err.message}`, err.stack);
      throw err; // rethrow so it still triggers Unauthorized
    }
  }
}
