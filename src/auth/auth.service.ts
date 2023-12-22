import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prismaService:  PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService,
        ) {
    }

    async register(authDTO: AuthDTO) {
        try {
            const hashPw = await argon.hash(authDTO.password);
            const user = await this.prismaService.user.create({
                data: {
                    userName: authDTO.userName,
                    hashPassword: hashPw,
                },
                select: {
                    id: true,
                    userName: true,
                    createdAt: true,
                }
            });

            return await this.converToJwtString(user.id, user.userName);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async converToJwtString(userId: number, userName: string):Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            userName: userName,
        }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10m',
            secret: this.configService.get('JWT_SECRET'),
        });

        return {
            accessToken: jwtString,
        }
    }

    login() {
        return "b";
    }
}