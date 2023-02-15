import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from './../users/users.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { SanitizedUserDto } from './../users/dto/sanitized-user.dto';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async signPayload(jwtPayload: JwtPayload): Promise<string> {
    return this.jwtService.sign(jwtPayload);
  }

  async login(email: string, password: string): Promise<SanitizedUserDto> {
    let user = await this.userService.findUser(email);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    const isMatched = await this.validatePassword(password, user.password);
    if (isMatched){
      delete user['password']; // Remove password in order to return sanitized object
      return user;
    }
    else
      throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST);
  }

  private async validatePassword(password: string, hashed_pwd: string): Promise<boolean> {
    return await compare(password, hashed_pwd);
  }
}