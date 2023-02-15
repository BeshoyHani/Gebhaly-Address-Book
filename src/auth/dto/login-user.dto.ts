import { PickType } from "@nestjs/mapped-types";
import { UserDto } from "../../users/dto/user.dto";

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) { }