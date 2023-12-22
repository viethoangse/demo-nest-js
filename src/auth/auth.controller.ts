import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService) {

    }

    @Post("register")
    register(@Body() authDTO: AuthDTO) {
        return this.authService.register(authDTO);
    }

    @Post("login")
    login() {
        return this.authService.login();
    }
}