import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { LoginUserDto } from './../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('register')
    async register(@Body() CreateUserDto: CreateUserDto): Promise<CreateUserDto> {
        const user = await this.userService.create(CreateUserDto);
        return user;
    }
    @Post('login')
    async login(@Body() UserDTO: LoginUserDto) {
        const { email, password } = UserDTO;
        const user = await this.authService.login(email, password);
        const payload = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

}
