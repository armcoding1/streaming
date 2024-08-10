import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("signup")
    @UsePipes(new ValidationPipe({ transform: true }))
    async signup(@Body() signupDTO: SignupDTO) {
        try {
            return await this.authService.signup(signupDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post("login")
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDTO) {
        try {
            return await this.authService.login(loginDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get("logout")
    async logout(@Res() res: any) {
        res.clearCookie('accessToken');
        return res.status(HttpStatus.OK).send();
    }
}