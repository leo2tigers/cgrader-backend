import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
    imports: [ConfigModule, HttpModule, JwtAuthModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
