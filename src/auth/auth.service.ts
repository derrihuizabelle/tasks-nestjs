import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('authService');

  constructor(
    @InjectRepository(UserRepository) private _userRepository: UserRepository,
    private _jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this._userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this._userRepository.validadeUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };

    try {
      const accessToken = await this._jwtService.sign(payload);
      this.logger.debug(
        `generated jwt token payload: ${JSON.stringify(payload)}`,
      );

      return { accessToken };
    } catch (error) {
      this.logger.error('failed to create jwt payload');
      throw new InternalServerErrorException();
    }
  }
}
