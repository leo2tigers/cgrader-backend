import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenInfo } from './jwt-auth.interface';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateToken(userId: string): string {
        return this.jwtService.sign({ userId });
    }

    verifyToken(token: string): JwtTokenInfo {
        return this.jwtService.verify(token) as JwtTokenInfo;
    }
}
