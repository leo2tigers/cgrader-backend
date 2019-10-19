import {
    Controller,
    Get,
    Res,
    Query,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { ConfigService } from '../config/config.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly configService: ConfigService,
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
    ) {}

    @Get('login')
    loginPage(@Res() res: Response) {
        return res.redirect(this.service.loginPageUrl);
    }

    @Get('/ticket')
    async validateTicket(
        @Query('ticket') ticket: string,
        @Res() res: Response,
    ) {
        try {
            const { _id, username } = await this.service.validateTicket(ticket);
            await this.userService.createIfNotExist(_id, username);
            const token = this.jwtAuthService.generateToken(_id);
            const FAR_FUTURE = 1000 * 60 * 60 * 24 * 365 * 10;
            return res
                .cookie('authToken', token, { maxAge: FAR_FUTURE })
                .redirect(this.configService.clientUrl);
        } catch {
            throw new UnauthorizedException('Invalid ticket');
        }
    }
}
