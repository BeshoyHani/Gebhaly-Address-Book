import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(CreateUserDto: CreateUserDto): Promise<User> {
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

    /*async login(email: string, password: string): Promise<User> {
        const user = await this.findUser(email);
        if(!user){
            throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
        }
        const isMatched = await this.validatePassword(password, user.password);
        if (isMatched)
            return this.getUserWithoutPass(user);
        else
            throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST);
    }*/

    async findUser(email: string): Promise<User>{
        const user = await this.userModel.findOne({ email });
        return user;
    }

    // return user object without password
    getUserWithoutPass(user: User): User {
        const obj = user;
        delete obj['password'];
        return obj;
    }

    async validatePassword(password: string, hashed_pwd: string): Promise<boolean>{
        return await compare(password, hashed_pwd);
      }
}
