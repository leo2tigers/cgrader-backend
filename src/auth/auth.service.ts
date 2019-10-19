import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { ValidateTicketResponse } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    get loginPageUrl(): string {
        return `${
            this.configService.authUrl
        }/auth?callback=${encodeURIComponent(
            `${this.configService.serverUrl}/auth/ticket`,
        )}`;
    }

    async validateTicket(ticket: string) {
        const { data } = await this.httpService
            .get<ValidateTicketResponse>(
                `${this.configService.authUrl}/ticket/validate`,
                {
                    headers: {
                        ticket,
                        appid: this.configService.authAppId,
                        appsecret: this.configService.authAppSecret,
                    },
                },
            )
            .toPromise();
        return data;
    }
}
