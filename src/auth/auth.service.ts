import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/users.interface';
import { UsersService } from './../users/users.service';
import { JwtPayload } from './interface/jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async signPayload(jwtPayload: JwtPayload): Promise<string> {
    return this.jwtService.sign(jwtPayload);
  }

async login(email: string, password: string): Promise<User> {
    const user = await this.userService.findUser(email);
    if(!user){
        throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    const isMatched = await this.userService.validatePassword(password, user.password);
    if (isMatched)
        return this.userService.getUserWithoutPass(user);
    else
        throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST);
}

  // async validateUser(email: string, password: string): Promise<User> {
  //   const user = await this.userService.findUser(email);
  //   const isValidPass = await compare(password, user.password);
  //   if (user && isValidPass) {
  //     return user;
  //   }
  //   else throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
  // }

}
