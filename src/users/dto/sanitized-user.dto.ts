import { OmitType, PickType } from "@nestjs/mapped-types";
import { UserDto } from "./user.dto";

export class SanitizedUserDto extends OmitType(UserDto, ['password', 'registeredSince']) {
    id?: string;
 }