import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SanitizedUserDto } from './dto/sanitized-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDto>) { }

    async create(CreateUserDto: UserDto): Promise<SanitizedUserDto> {
        CreateUserDto.email = CreateUserDto.email.toLowerCase();
        
        const { email } = CreateUserDto;
        const user = await this.findUser(email);
        if (user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel({
            ...CreateUserDto,
            registeredSince: Date.now()
        });
        await createdUser.save();
        return this.getUserWithoutPass(createdUser);
    }

    async findUser(email: string): Promise<UserDto>{
        const user = await this.userModel.findOne({ email });
        return user;
    }

    // return user object without password
    private getUserWithoutPass(user: UserDto): SanitizedUserDto {
        delete user['password'];
        return user;
    }
}
