import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class JwtPayload extends PickType(CreateUserDto, ['email', 'first_name', 'last_name']) { 
    id: string;
}