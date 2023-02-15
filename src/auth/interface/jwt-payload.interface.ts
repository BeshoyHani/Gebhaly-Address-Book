import { PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/users/dto/user.dto';

export class JwtPayload extends PickType(UserDto, ['email', 'first_name', 'last_name']) { 
    id: string;
}